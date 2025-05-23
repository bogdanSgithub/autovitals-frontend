import { JSX, useState } from "react";
import { UpdateForm } from "./UpdateForm";
import { Car } from "./Car";
import { useParams } from "react-router-dom";


/**
 * @summary A component that represents a button to update the car details.
 * @param props The car object and the function to update the car details on the parent component, this is done to later be passed to the form component where it will be used.
 * @param props.car - The car to be updated.
 * @param props.onUpdate - The function to call when the car is updated, so that the parent component can update its state.
 * @returns The button and the form depending on if the button was clicked.
 */
export function UpdateDetails(props: {car: Car, onUpdate: (updatedCar: {model: string, year: number, mileage: number, url: string, dateBought: Date, _id: string, userID: string}) => void}): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const username = params.username;


    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>Update Car Button</button>
    
            {isModalOpen && username && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div style={{padding:15}} className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <UpdateForm
                    car={props.car}
                    onUpdate={props.onUpdate}
                    />
                    <button className="close-button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                    </button>
                </div>
                </div>
            )}
        </>
)}