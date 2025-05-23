import { JSX } from "react";
import { Car } from "./Car";

/**
 * @summary A component that represents a button to delete a car from the database.
 * @param props The props of the component.
 * @param props.model The model of the car to delete.
 * @param props.year The year of the car to delete.
 * @returns The button to delete the car.
 */
export function DeleteButton(props: {id: string}) : JSX.Element {

    async function handleDelete(){         
        const response = await fetch(`http://localhost:1339/cars/${props.id}`, {method: "DELETE"});
 
 
        // if status is 200
        if (response.ok){
            alert(`${props.id} has been successfully deleted.`)
        }
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}