import { FormEvent, JSX, useState } from "react"
import { Car } from "./Car";
import { useParams } from "react-router-dom";

/**
 * @summary A component that represents the form where the user can input a new car to add.
 * @param setAddedCar A setter method for a state variable used to display the added car if the operation was succesful.
 * @returns The form for the user to input a new car in.
 */
export function AddCarForm({ setAddedCar }: { setAddedCar: (car: Car) => void }): JSX.Element {
    const [model, setModel] = useState<string | null>(null)
    const [year, setYear] = useState<string>("")
    const [mileage, setMileage] = useState<string>("")
    const [dateBought, setDateBought] = useState<string>("")
    const [url, setUrl] = useState<string>("");
    const params = useParams();
    const username = params.username;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        // create the car to add
        const carToAdd = {
           model: model,
           year: parseInt(year),
           mileage: parseInt(mileage),
           dateBought: dateBought,
           url: url,
           userID: username
        }

        // add options for the request, since it is a post we need to specify the body.
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(carToAdd),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cars`, requestOptions)

            if (!response.ok) {
                alert("Error adding car: " + await response.text());
            }
            else{
                const car: Car = await response.json()
                setAddedCar(car)    
                alert(`Car was successfully added.`)
            }
    
        } catch (error) {
            alert("Error adding car:" + error);
        }
    }

    return (
        <>
        <h2>Add Car</h2>
        <form onSubmit={handleSubmit} style={{padding:0}}>
        <label htmlFor="model">Model: </label>
        <input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">Year: </label>
        <input type="number" placeholder="Year" onChange={(e) => setYear(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">Mileage: </label>
        <input type="number" placeholder="Year" onChange={(e) => setMileage(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">Date Bought: </label>
        <input type="date" placeholder="Year" onChange={(e) => setDateBought(e.target.value)} required></input>
        <br/>

        <label htmlFor="Year">URL: </label>
        <input type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)}></input>
        <br/>
        <button type="submit" className="form-button">Add Car</button>
       </form>
       </>
    )
}