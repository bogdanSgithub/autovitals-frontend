import { Profile } from "./Profile";

export async function fetchProfile(username: string | undefined, setProfile: (profile: Profile) => void) {
    console.log("too many times")
    
    if (!username || username === ":username") return;
    const response = await fetch(`http://localhost:1339/profile/${username}`, {
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