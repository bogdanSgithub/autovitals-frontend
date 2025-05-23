// Bogdan
import { useState, JSX, FormEvent, useContext } from "react";
import '../profile/AddProfileForm';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

/**
 */
export function LoginForm(): JSX.Element {
    const [inputUsername, setInputUsername] = useState<string | null>(null);
    const [inputPassword, setInputPassword] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setIsLoggedIn, setUsername } = useContext(AuthContext);

    /**
     * Handles form submission, sends profile data to the backend and navigates to profile profile page.  
     * @param event - The form submission event.
     */
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!inputUsername || !inputPassword) {
            return;
        }
        await login(inputUsername, inputPassword);
    }

    async function login(username: string, password: string) {
        const response = await fetch("http://localhost:1339/session/login", 
            { method: "POST",
              credentials: 'include',
              body: JSON.stringify({
                    username: username,
                    password: password,
                }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
            }
        );
        if (response.status === 200 && inputUsername) {
            alert("profile was successfully logged in");
            setIsLoggedIn(true);
            setUsername(inputUsername);
            navigate(`/profile/${username}`);
        }
        else {
            const message = await response.text();
            alert(message);
            setIsLoggedIn(false);
            return;
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
                <button type="submit">Login</button>
            </form>
        </div>
    </>
    )
}