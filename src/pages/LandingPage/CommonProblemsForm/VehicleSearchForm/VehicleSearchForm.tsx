import "./VehicleSearchForm.css";
import { JSX, useEffect, useState } from "react";
import { CommonProblemsResults } from "../CommonProblemsResults/CommonProblemsResults";

// Function to call Gemini and fetch car issues
async function fetchCarDetails(geminiUrl: string, make: string, model: string, year: string): Promise<string> {
  const prompt = `What are the most common mechanical or technical issues for a ${year} ${make} ${model}? Give a short bullet list. Exactly in the following format : "Oil leak from engine gasket",
          "Brake wear after 30k miles",
          "AC failure in hot climates", if the car provided doesnt exist, please say "No data found for this car" and NOTHING ELSE.`;

  const requestData = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await fetch(geminiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No data found.";
}

export default function VehicleSearchForm(): JSX.Element {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [issues, setIssues] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Gemini API config
  const apiKey = "AIzaSyChjODftywEX8bMWLCcoxmelouLHd2AcrY";

  if (!apiKey) {
    throw new Error("Gemini Maps API key is missing");
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  async function getMakesAndUpdateMakeDropdown() {
    try {
      const res = await fetch("/carMakes.json");
      const data = await res.json();
      setMakes(data.car_makes);
    } catch (error) {
      console.error("Failed to load car makes:", error);
    }
  }

  async function getModelsByMakeAndUpdateDropdown(make: string) {
    try {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`;
      const response = await fetch(url);
      const data = await response.json();
      const modelNames: string[] = data.Results.map((model: any) => model.Model_Name);
      setModels(modelNames);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    }
  }

  useEffect(() => {
    getMakesAndUpdateMakeDropdown();
  }, []);

  useEffect(() => {
    if (selectedMake) {
      getModelsByMakeAndUpdateDropdown(selectedMake);
    } else {
      setModels([]);
    }
  }, [selectedMake]);

  async function handleSearchClick() {
    if (selectedMake && selectedModel && selectedYear) {
      setLoading(true);
      try {
        const response = await fetchCarDetails(geminiUrl, selectedMake, selectedModel, selectedYear);
        const parsedIssues = response
          .split("\n")
          .map((line) => line.replace(/^[-•]\s*/, "").trim())
          .filter((line) => line.length > 0);

        setIssues(parsedIssues);
      } catch (error) {
        console.error("Failed to fetch car issues:", error);
        setIssues(["Failed to retrieve car issues. Please try again."]);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <form className="vehicle-search-form">
        <div className="input-group">
          <div className="form-group">
            <label htmlFor="make">Make</label>
            <select
              id="make"
              name="make"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Select</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              name="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select</option>
              {Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (
                <option key={i} value={String(2025 - i)}>
                  {2025 - i}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group button-group">
            <button
              type="button"
              onClick={handleSearchClick}
              style={{ backgroundColor: "#1f365e", color: "white" }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {issues.length > 0 && (
        <CommonProblemsResults
          make={selectedMake}
          model={selectedModel}
          year={selectedYear}
          issues={issues}
        />
      )}
    </>
  );
}
