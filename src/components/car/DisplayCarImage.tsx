import { useNavigate } from "react-router-dom"
import { Car } from "./Car";
import { JSX, useContext } from "react";
import { AuthContext } from '../../AuthContext';

/**
 * @summary A component that represents an image of a car, which is clickable and navigates to the readCar page with the car details.
 * @param props The props of the component.
 * @param props.car The car object to pass the the next window.
 * @returns The clickable image.
 */
export function DisplayCarImage(props: {car: Car}): JSX.Element {
    const navigate = useNavigate();
    const { username } = useContext(AuthContext);

    return (
        <>
        <br/>
        <img src={props.car.url} alt="Car" onClick={() => {console.log("plz " + `/${username}/${props.car._id}`); navigate(`/${username}/${props.car._id}`)}}/>
        </>
    )
}