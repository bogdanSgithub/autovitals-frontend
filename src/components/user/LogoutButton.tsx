// Bogdan
import { JSX, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useCookies } from 'react-cookie';

/**
 */
export function LogoutButton(): JSX.Element {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();
    const { isLoggedIn, setIsLoggedIn, setUsername } = useContext(AuthContext);

    async function logout() {
        const response = await fetch("http://localhost:1339/session/logout", 
            { method: "GET",
              credentials: 'include',
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
            }
        );
        if (response.status === 200) {
            removeCookie('lastCarId', { path: '/' });
            removeCookie('trackerId', { path: '/' });
            alert("profile was successfully logged out");
            setIsLoggedIn(false);
            setUsername("");
            navigate("/");
        }
        else {  
            const message = await response.text();
            alert(message);
            return;
        }
    }
    
    return (
    <>  
        {isLoggedIn && <button onClick={logout}>Logout</button>
        } 
    </>
    )
}