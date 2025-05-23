// Bogdan
import { JSX } from "react";
import { useState, useEffect } from "react"
import { ListProfiles } from "./ListProfiles";
import { Profile } from "./Profile";

/**
 * Component that fetches and displays a list of all Profiles.
 * 
 * This component fetches the list of Profiles from the server when the component is mounted using the `useEffect` hook.
 * @returns {JSX.Element} The rendered component, which includes a list of Profiles.
 */
export function AllProfiles(): JSX.Element {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        fetchAllProfiles();
    }, []);

    async function fetchAllProfiles() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles`, { method: "GET", credentials: "include" });
        const result = await response.json();
        setProfiles(result);
    }

    return (
        <ListProfiles profiles={profiles}/>
    )
}