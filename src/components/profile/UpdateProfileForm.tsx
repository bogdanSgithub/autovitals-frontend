// Bogdan
import { useState, JSX, FormEvent } from "react";
import "./AddProfileForm.css";
import { Profile } from "./Profile";
import AddressAutocomplete from "./AddressAutocomplete";

/**
 * A form component for updating profile information.
 * 
 * This component allows the profile to enter their current first and last name, as well as new values
 * for their first and last name. Upon form submission, it sends a `PUT` request to update the profile 
 * information and navigates to the updated profile's profile page.
 * 
 * @param {CallableFunction} props.setProfile - A function to update the profile state with new information.
 * @returns {JSX.Element} The rendered JSX for the profile update form.
 */
export function UpdateProfileForm({ profile, setProfile } : { profile: Profile | undefined, setProfile: CallableFunction } ): JSX.Element {
    const [newEmail, setNewEmail] = useState<string|null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [newEmailReminderPreference, setNewEmailReminderPreference] = useState<string|null>(null);
    
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!profile || !newEmail || !coords || !newEmailReminderPreference) {
            alert("bro");
            return;
        }
        await updateProfile(profile.username, newEmail, coords, newEmailReminderPreference);
    }

    async function updateProfile(username: string, newEmail: string, coords: {lat: number, lng: number}, newEmailReminderPreference: string) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles`, 
            { method: "PUT", 
              body: JSON.stringify({
                    email: newEmail,
                    isAdmin: false,
                    username: username,
                    coordinates: [coords.lat, coords.lng],
                    emailReminderPreference: newEmailReminderPreference
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
        alert("profile was succesfully updated");

        const result = await response.json();
        await setProfile({
            ...profile,
            email: result.email,
            coordinates: result.coordinates,
            emailReminderPreference: result.emailReminderPreference,
        });
    }
    
    return (
    <div className="form-container">  
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="newEmail">New Email</label>
            <input type="text" placeholder="New Email" onChange={(e) => setNewEmail(e.target.value)} required/>

            <label htmlFor="location">Location</label>
            <AddressAutocomplete setCoords={setCoords}/>
            
            <label htmlFor="emailReminderPreference">Email Reminder Preference</label>
                <select id="emailReminderPreference" value={newEmailReminderPreference || ''} onChange={(e) => setNewEmailReminderPreference(e.target.value as 'none' | '1_day' | '3_days')} required>
                    <option value="none">None</option>
                    <option value="1_day">1 Day Before</option>
                    <option value="3_days">3 Days Before</option>
                </select>
            {newEmail && coords && newEmailReminderPreference && <button type="submit">Update profile</button>}
        </form>
    </div>
    )
}

