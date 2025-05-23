import { Car } from "./Car";
import { DeleteButton } from "./DeleteButton";
import { DisplayCarImage } from "./DisplayCarImage";
import "./CarDisplay.css"
import { JSX } from "react";
import { DisplayNotifications } from "./DisplayNotifications";

/**
 * @summary A component that displays a car, which includes an image which is clickable to lead to another page, model, year, and a delete button.
 * @param props The props of the component.
 * @param props.car The car object to display.
 * @returns The cars information.
 */
export function DisplayCar(props: {car: Car}): JSX.Element {
    return (
        <div style={{ display: 'flex' }}>
            <div className="car-card">
            <DisplayCarImage car={props.car}/>
            <div className="car-info">
                <p className="car-model">Model: {props.car.model}</p>
                <p className="car-year">Year: {props.car.year}</p>
                <DeleteButton id={props.car._id} />
            </div>
            </div>
            <DisplayNotifications id={props.car._id} model={props.car.model} userID={props.car.userID}/>
        </div>
    )
}