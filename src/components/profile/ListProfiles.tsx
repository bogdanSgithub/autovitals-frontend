// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";
import { DeleteProfileButton } from "./DeleteProfileButton";
import "./ListProfiles.css";
import { DisplayProfileSmall } from "./DisplayProfileSmall";

/**
 * Displays a list of profiles with links to their profiles.
 * @returns {JSX.Element} The rendered JSX for the list of profiles.
 */
export function ListProfiles({ profiles, deleteAdmin }: { profiles: Profile[]; deleteAdmin: boolean } ): JSX.Element {    
    return (
    <>  
        <h2>All profiles</h2>  
        <div className="list-profiles">
            {profiles.map((profile) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DisplayProfileSmall key={profile._id} profile={profile} />
                <DeleteProfileButton adminDelete={deleteAdmin} profile={profile} />
            </div>
            ))}
        </div>
    </>
    )
}