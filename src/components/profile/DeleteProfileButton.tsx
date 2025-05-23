// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

/**
 * Renders a button that deletes the given profile when clicked.
 * 
 * @param {profile | undefined} props.profile - The profile to delete. If undefined or incomplete, the button will not render.
 * @returns {JSX.Element} The DeleteprofileButton component.
 */
export function DeleteProfileButton(props: {profile: Profile | undefined, adminDelete: boolean}): JSX.Element {    
    const hasProfile = props.profile?.email && props.profile?.username;
    const navigate = useNavigate();
    const { setIsLoggedIn, setUsername  } = useContext(AuthContext);

    async function deleteProfile() {
        alert(`Are you sure to delete ${props.profile?.username} ${props.adminDelete}?`)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles`, 
            { 
                method: "DELETE",
                
              body: JSON.stringify({
                    username: props.profile?.username,
                    isAdminDelete: props.adminDelete
                }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              credentials: "include" 
            }
        );
        if (!response.ok) {
            const message = await response.text();
            alert(message);
            return;
        }
        alert(`profile ${props.profile?.username} was succesfully deleted`);
        if (!props.adminDelete) {
            setIsLoggedIn(false);
            setUsername('');
            navigate("/");
        }
    }

    async function handleClick() {
        if (!hasProfile || props.profile?.email === undefined || props.profile?.username === undefined) {
            alert("No profile selected");
            return;
        }
        
        await deleteProfile();
    }

    return (
    <>
        {hasProfile ? (
          <button style={{backgroundColor: "red"}} onClick={handleClick}>Delete</button>
        ) : (
            <></>
        )}
    </>
    )
}