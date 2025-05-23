// Bogdan
import { useState, JSX, FormEvent, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

/**
 * Renders a form to add a new profile 
 * @param {CallableFunction} setProfile setter method of profile 
 * @returns {JSX.Element} The form
 */
export function SignUpForm(): JSX.Element {
    const [inputUsername, setInputUsername] = useState<string | null>(null);
    const [inputPassword, setInputPassword] = useState<string | null>(null);
    const { setIsLoggedIn, setUsername } = useContext(AuthContext);
    const navigate = useNavigate();

    /**
     * Handles form submission, sends profile data to the backend and navigates to profile profile page.  
     * @param event - The form submission event.
     */
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!inputUsername || !inputPassword) {
            return;
        }
        await register(inputUsername, inputPassword);
    }

    async function register(username: string, password: string) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, 
            { method: "POST", 
              credentials: "include",
              body: JSON.stringify({
                    username: username,
                    password: password,
                }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
            }
        );
        if (!response.ok || !inputUsername) {
            console.log("whyyy???");
            const message = await response.text();
            alert(message);
            return;
        }
        else {
            alert(`user was succesfully created`);
            setUsername(inputUsername);
            setIsLoggedIn(true);
            navigate(`/${inputUsername}/startup`)
        }
    }
    
    return (
    <>  
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="username" onChange={(e) => setInputUsername(e.target.value)} required/>
                
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="password" onChange={(e) => setInputPassword(e.target.value)} required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </>
    )
}