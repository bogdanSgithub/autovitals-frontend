// Bogdan
import { JSX, useState } from "react";
import { Profile } from "./Profile";
import { UpdateProfileForm } from "./UpdateProfileForm";
import "../modal.css";

/**
 * Button component that opens a modal for updating profile information.
 * 
 * @param {profile | undefined} props.profile - The profile object to be updated.
 * @returns {JSX.Element} The rendered JSX for the update profile button and modal.
 */
export function UpdateProfileButton({ profile, setProfile } : { profile: Profile | undefined, setProfile: CallableFunction }): JSX.Element {    
    const hasProfile = profile?.email && profile?.username;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
    <>
        {hasProfile && (
            <button onClick={() => setIsModalOpen(true)}>Update profile</button>
        )}
        {isModalOpen && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Update {profile?.username} {profile?.email}</h2>
                <UpdateProfileForm
                profile={profile}
                setProfile={setProfile}
                />
                <button className="close-button" onClick={() => setIsModalOpen(false)}>
                Cancel
                </button>
            </div>
            </div>
        )}
    </>
    )
}