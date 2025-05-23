import { JSX } from "react";
import { Car } from "./Car";
import { DisplayCar } from "./DisplayCar";

/**
 * @summary Displays a list of cars, used to display all cars in the database.
 * @param props The props for the component, which include the cars to display.
 * @param props.cars The cars to display.
 * @returns The cars in the database.
 */
export function DisplayCars(props: {cars: Car[]}): JSX.Element {

    const carList = props.cars.map((car) => (
        <DisplayCar key={car._id} car={car} />
    ));
    
    return (
        <div>
            {carList}
        </div>
    );
    
}