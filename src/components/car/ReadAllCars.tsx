import { JSX, useEffect, useState } from "react";
import { DisplayCars } from "./DisplayCars";
import { Car } from "./Car";
import { CarContext } from "./CarContext";

/**
 * @summary A component that represents a page for reading all cars from the database.
 * @returns The page for reading all cars from the database
 */
export function ReadAllCars({ username, refreshTrigger }: { username: string, refreshTrigger: unknown; }): JSX.Element {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cars/all/${username}`);
            const data: Car[] = await response.json();
            console.log(data);
            setCars(data);
        };

        fetchCars();
    }, [username, refreshTrigger]);

    const onDelete = (id: string) => {
        setCars(prev => prev.filter(car => car._id !== id));
    };

    return (
         <CarContext.Provider value={{ onDelete }}>
            <h1>Your Cars</h1>
            <DisplayCars cars={cars}/> 
        </CarContext.Provider>
    );
}