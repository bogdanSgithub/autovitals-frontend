import { JSX, useEffect, useState } from "react";
import { DisplayCars } from "./DisplayCars";
import { Car } from "./Car";

/**
 * @summary A component that represents a page for reading all cars from the database.
 * @returns The page for reading all cars from the database
 */
export function ReadAllCars({ username, refreshTrigger }: { username: string, refreshTrigger: any }): JSX.Element {
    const [cars, setCars] = useState<Car[]>([]);

    // on load and whenever refreshTrigger changes, fetch cars
    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cars/all/${username}`);
            const data: Car[] = await response.json();
            console.log(data);
            setCars(data);
        };

        fetchCars();
    }, [refreshTrigger, username]); // trigger re-fetch on change

    return (
        <>
            <h1>Your Cars</h1>
            <DisplayCars cars={cars}/> 
        </>
    );
}