import { Maintenance } from "./Maintenance";

/**
 * Bogdan Feher, I made this a seperate function since we need it in 2 places.
 * Fetches all maintenance records from the server and updates the component
 * state with the received records.
 *
 * If the request fails, it logs an error message to the console.
 */
export async function fetchAllMaintenances(carId: string, setMaintenances: (maintenances: Maintenance[]) => void) {
    try {
      const response = await fetch(`{import.meta.env.VITE_BACKEND_URL}/maintenance/${carId}`, {
      credentials: "include",
    });
      const data = await response.json();
      if (Array.isArray(data)) {
        setMaintenances(data);
      } else {
        setMaintenances([]);
      }
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
}