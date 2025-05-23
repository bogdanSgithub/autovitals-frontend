// Bogdan
import { JSX, useState } from "react";
import { AddCarForm } from "./AddCarForm";
import { Car } from "./Car";
import { useParams } from "react-router-dom";

/**
 * Button component that opens a modal for updating user information.
 * 
 * @param {User | undefined} props.user - The user object to be updated.
 * @returns {JSX.Element} The rendered JSX for the update user button and modal.
 */
export function AddCarButton({ setAddedCar }: { setAddedCar: (car: Car) => void }): JSX.Element {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const username = params.username;

    return (
    <>
        <button onClick={() => setIsModalOpen(true)}>Add Car</button>

        {isModalOpen && username && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div style={{padding:15}} className="modal-content" onClick={(e) => e.stopPropagation()}>
                <AddCarForm
                setAddedCar={setAddedCar}
                />
                <button className="close-button" onClick={() => setIsModalOpen(false)}>
                Cancel
                </button>
            </div>
            </div>
        )}
    </>
    )
}