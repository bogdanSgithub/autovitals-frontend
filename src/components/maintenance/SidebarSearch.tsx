import { useState, useEffect } from "react";
import Modal from "./modal";
import SearchBar from "./searchbar";
import "./sidebarLinks.css";
import "./sidebarSearch.css";
import RecordList from "./recordList";
import { useNavigate, useParams } from "react-router-dom";
import { Maintenance } from "./Maintenance";
import { Car } from "../car/Car";
import { UpdateDetails } from "../car/UpdateDetails";
import { fetchAllMaintenances } from "./FetchAllMaintenances";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";

/**
 * A sidebar component for searching and viewing maintenance records.
 *
 * This component displays a list of up to 10 maintenance records that match
 * the search query. It also displays a search input field and a button to
 * add a new record. When a record is selected, it displays the record's details
 * in a modal window with options to edit or delete the record.
 *
 **/
export function SidebarSearch() {
  const { username  } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<Maintenance[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<
    (Maintenance & { _id?: string }) | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalCarPart, setOriginalCarPart] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const carId = params.carId;
  const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [cookies, setCookie] = useCookies(['lastCarId']);
  const onUpdate = (updatedCar: Car) => {
      setCurrentCar(updatedCar);
  }

useEffect(() => {
  if (!username || !params.username || params.username !== username) {
    navigate(`/`);
    return;
  }

  if (!carId) {
    navigate(`/profile/${username}`);
  }

  if (carId) {
    const in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    setCookie('lastCarId', carId, { path: '/', expires: in30Minutes });
  }

  fetchCar();
  fetchAllMaintenances(carId!, setRecords);
}, [username, carId, navigate]);

  async function fetchCar() {
    try {
      const response = await fetch(`http://localhost:1339/cars/${carId}`);

      const data = await response.json();
      setCurrentCar(data);
      console.log(data)
      
    } catch (err) {
      console.error("Failed to fetch car", err);
    }
  }

  async function handleAdd() {
    navigate(`/${username}/${carId}/maintenance`);
  }

  /**
   * Deletes a maintenance record for the specified car part.
   *
   * @param carPart - The car part identifier of the record to delete.
   *
   * @remarks
   * Sends a DELETE request to the server to remove the maintenance record
   * associated with the given car part. If the deletion is successful, it
   * refreshes the list of records by calling `fetchAllRecords()`. If the
   * deletion fails, it logs an error message to the console.
   */
  
  async function handleDelete(carPart: string) {
    if (!carId) {
      alert("cannot delete no carId");
      return;
    }
    const res = await fetch(
      `http://localhost:1339/maintenance/${carId}/${carPart}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      fetchAllMaintenances(carId, setRecords);
    } else {
      console.error("Delete failed");
    }
  }

  /**
   * Handles the change event of the search input field by updating the component
   * state with the new search query and fetching the matching records from the
   * server. If the search query is empty, it fetches all records. Otherwise, it
   * fetches the record associated with the given car part. If the request fails,
   * it logs an error message to the console.
   * @param e The change event of the input field.
   */
  async function handleSearchChangeAndFetch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newSearch = e.target.value;
    setSearch(newSearch);

    try {
      if (newSearch === "") {
        fetchAllMaintenances(carId!, setRecords);
      } else {
        const response = await fetch(
         `http://localhost:1339/maintenance/${carId}/${newSearch}`
        );
        const data = await response.json();
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setRecords([data]);
        } else {
          setRecords([]);
        }
      }
    } catch (error) {
      console.error("Search fetch error:", error);
      setRecords([]);
    }
  }

  /**
   * Handles a change event of a field in the selected record by updating the
   * local component state with the new value.
   * @param field The field of the record to update.
   * @param value The new value of the field.
   */
  const handleFieldChange = (
    field: keyof Maintenance,
    value: string | number
  ) => {
    setSelectedRecord((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  /**
   * Handles the save button click event of the edit modal.
   *
   * This function is called when the save button is clicked in the edit modal.
   * It sends a PUT request to the backend to update the selected record.
   * If the request is successful, it displays a success alert and resets the
   * state of the component.
   * If the request fails, it displays an error alert.
   * @throws {Error} If the request fails, either due to a MongoDB error or an unknown error.
   */
  async function handleSave() {
    try {
      if (!originalCarPart) {
        alert("Original car part not set!");
        return;
      }

      const { _id, ...recordToUpdate } = selectedRecord as Maintenance & {
        _id: string;
      };

      const response = await fetch(
        `http://localhost:1339/maintenance/1/${originalCarPart}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recordToUpdate),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      alert("✅ Record updated!");
      setIsEditing(false);
      setSelectedRecord(null);
      setOriginalCarPart(null);
      fetchAllMaintenances(carId!, setRecords)
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Update failed.");
    }
  }
  return (
    <>
    <div className="mainContent">
      <div className="leftContent">
        <img src={currentCar?.url} alt="Car" />
        <div>
          <p>Model: {currentCar?.model}</p>
          <p>Year: {currentCar?.year}</p>
          <p>Mileage: {currentCar?.mileage}</p>
     </div>
      {currentCar && <UpdateDetails car={currentCar} onUpdate={onUpdate}/> }
    </div>


    <aside className="sidebar">        
      <h2 className="sidebar-title">🔧 Maintenance Records</h2>
      <SearchBar search={search} onSearchChange={handleSearchChangeAndFetch} />
      <nav className="sidebar-links">
        <button onClick={handleAdd}>➕ Add Record</button>
      </nav>
      <RecordList
        records={records}
        onSelect={(record) => {
          setSelectedRecord(record);
          setOriginalCarPart(record.carPart);
        }}
        onDelete={handleDelete}
      />
      {selectedRecord && (
        <Modal
          record={selectedRecord}
          isEditing={isEditing}
          onClose={() => {
            setIsEditing(false);
            setSelectedRecord(null);
            setOriginalCarPart(null);
          }}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
          onEdit={() => setIsEditing(true)}
          onCancelEdit={() => setIsEditing(false)}
        />
      )}
    </aside>
    </div>
    </>
  );
}
