import { JSX } from "react";
import './CommonProblemsResults.css'
interface CommonProblemsResultsProps {
    make: string;
    model: string;
    year: string;
    issues: string[]; // or any shape your issues take
  }
  
  export function CommonProblemsResults({
    make,
    model,
    year,
    issues,
  }: CommonProblemsResultsProps): JSX.Element {
    return (
      <div className="ResultsContainer">
        <h3>Common Issues for {year} {make} {model}</h3>
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>
    );
  }