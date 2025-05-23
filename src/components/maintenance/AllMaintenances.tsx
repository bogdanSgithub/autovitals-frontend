// Bogdan
import { JSX } from "react";
import { useState, useEffect } from "react";
import { Maintenance } from "./Maintenance";
import { ListMaintenances } from "./ListMaintenances";

/**
 * Component that fetches and displays a list of all Maintenance records.
 * 
 * This component fetches the list of Maintenance records from the server when the component is mounted using the `useEffect` hook.
 * @returns {JSX.Element} The rendered component, which includes a list of Maintenances.
 */
export function AllMaintenances(): JSX.Element {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

    useEffect(() => {
        fetchAllMaintenances();
    }, []);

    async function fetchAllMaintenances() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/maintenance/all`, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        setMaintenances(result);
    }

    return (
        <ListMaintenances deleteAdmin={true} maintenances={maintenances} />
    );
}
