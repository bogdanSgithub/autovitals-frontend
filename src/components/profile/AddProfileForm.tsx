// Bogdan
import { useState, JSX, FormEvent } from "react";
import './AddProfileForm.css';
import AddressAutocomplete from "./AddressAutocomplete";
import { useNavigate } from "react-router-dom";

/**
 * Renders a form to add a new profile 
 * @param {CallableFunction} setProfile setter method of profile 
 * @returns {JSX.Element} The form
 */
export function AddProfileForm({ username } : { username: string } ): JSX.Element {
    const [email, setEmail] = useState<string|null>(null);
    const [emailReminderPreference, setEmailReminderPreference] = useState<'none' | '1_day' | '3_days' | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const navigate = useNavigate();

    /**
     * Handles form submission, sends profile data to the backend and navigates to profile profile page.  
     * @param event - The form submission event.
     */
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        await addProfile(email || '', emailReminderPreference || '');
    }

    /**
     * Sends a POST request to create a new profile.
     * 
     * @param {string} email - profile's first name.
     * @param {string} emailReminderPreference - profile's last name.
     */
    async function addProfile(email: string, emailReminderPreference: string) {
        if (!coords) {
            alert("must have coords");
            return;
        }
        const response = await fetch("http://localhost:1339/profiles", 
            { method: "POST",
            credentials: "include",
              body: JSON.stringify({
                    email: email,
                    isAdmin: false,
                    username: username,
                    coordinates: [coords.lat, coords.lng],
                    emailReminderPreference: emailReminderPreference
                }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
            }
        );
        if (!response.ok) {
            const message = await response.text();
            alert(message);
            return;
        }
        alert("profile was succesfully created");
        await response.json();
        navigate(`/profile/${username}`);
    }
    
    return (
    <>  
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="location">Location</label>
                <AddressAutocomplete setCoords={setCoords}/>
                <label htmlFor="emailReminderPreference">Email Reminder Preference</label>
                <select id="emailReminderPreference" value={emailReminderPreference || ''} onChange={(e) => setEmailReminderPreference(e.target.value as 'none' | '1_day' | '3_days')} required>
                    <option value="none">None</option>
                    <option value="1_day">1 Day Before</option>
                    <option value="3_days">3 Days Before</option>
                </select>
                <button type="submit" id="createProfile">Create Profile</button>
            </form>
        </div>
    </>
    )
}

