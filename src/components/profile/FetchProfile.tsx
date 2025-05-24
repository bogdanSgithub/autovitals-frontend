import { Profile } from "./Profile";


/**
 * Fetches the profile data for a given username and updates the state with the fetched profile.
 * @param {string | undefined} username - The username of the profile to fetch.
 * @param {function} setProfile - The function to update the profile state.
 * @returns {Promise<boolean>} - Returns true if the profile was fetched successfully, false otherwise.
 */
export async function fetchProfile(username: string | undefined, setProfile: (profile: Profile) => void) {
    console.log("too many times")
    
    if (!username || username === ":username") return;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/${username}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            return false;
        }
    }

    const result = await response.json();
    setProfile(result);
    return true;
};