import { JSX, useState } from "react";
import { Car } from "./Car";
import './Forms.css';

/**
 * @summary The UpdateForm component is a form that allows the user to update a car's model and year.
 * It takes in a car object and an onUpdate function as props.
 * @param props - The props for the UpdateForm component.
 * @param props.car - The car to be updated.
 * @param props.onUpdate - The function to call when the car is updated, so that the parent component can update its state.
 * @returns The form for updating a car.
 */
export function UpdateForm(props: {car: Car, onUpdate: (updatedCar: {model: string, year: number, mileage: number, url: string, dateBought: Date, _id: string}) => void}): JSX.Element {
    const [newModel, setModel] = useState<string | null>(null)
    const [newYear, setYear] = useState<string>("")
    const [newMileage, setMileage] = useState<string>("")
    const [newDateBought, setDateBought] = useState<string>("")
    const [newURL, setUrl] = useState<string>("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        //stop page from reloading on submit
        e.preventDefault()

        const updatedCar = {
            id: props.car._id,
            newModel: newModel,
            newYear: parseInt(newYear),
            newMileage: newMileage,
            newDateBought: newDateBought,
            newURL: newURL
        }

         // add options for the request, since it is a put we need to specify the body.
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(updatedCar),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cars/`, requestOptions)
        
        if (!response.ok) {
            alert("Error updating car: " + await response.text());
        }else {
            const car: Car = await response.json()

            alert(`Car was succerefully updated.`)

            props.onUpdate(car)
        }
    }
    
    return(

        <>
        <h2>Update Car</h2>


        <form onSubmit={handleSubmit} style={{padding: 100}}>
        <label htmlFor="model">New Model: </label>
        <input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">New Year: </label>
        <input type="number" placeholder="Year" onChange={(e) => setYear(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">New Mileage: </label>
        <input type="number" placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">New Date Bought: </label>
        <input type="date" placeholder="Date" onChange={(e) => setDateBought(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">New URL: </label>
        <input type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)}></input>
        <br/>

        <button type="submit" className="form-button">Update Car</button>
       </form>
       </>

       )
}