// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";
import { DisplayProfile } from "./DisplayProfile";
import { DeleteProfileButton } from "./DeleteProfileButton";
import "./ListProfiles.css";

/**
 * Displays a list of profiles with links to their profiles.
 * @returns {JSX.Element} The rendered JSX for the list of profiles.
 */
export function ListProfiles({ profiles } : { profiles: Profile[] } ): JSX.Element {    
    return (
    <>  
        <h2>All profiles</h2>  
        <div className="list-profiles">
            {profiles.map((profile) => (
            <>
                <DisplayProfile key={profile._id} profile={profile} />
                <DeleteProfileButton profile={profile}/>
            </>
            ))}
        </div>
    </>
    )
}