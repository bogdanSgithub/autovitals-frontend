import { useLocation } from "react-router-dom";
import { Car } from "../components/car/Car";
import { UpdateDetails } from "../components/car/UpdateDetails";
import { JSX, useState } from "react";

/**
 * @summary A component that represents a page for displaying a car from the database.
 * @returns The select car by the user in the previous page
 */
export function ReadCarPage(): JSX.Element {
    const location = useLocation();

    const { imageUrl, car } = location.state as { imageUrl: string; car: Car };
    const [currentCar, setCurrentCar] = useState(car);

    const onUpdate = (updatedCar: Car) => {
        setCurrentCar(updatedCar);
    }

    return (
        <>
        <br/>
        <img src={imageUrl}/>
        <div>
            <p>Model: {currentCar.model}</p>
            <p>Year: {currentCar.year}</p>
        </div>
        <UpdateDetails car={currentCar} onUpdate={onUpdate}/>
        </>
    )
}