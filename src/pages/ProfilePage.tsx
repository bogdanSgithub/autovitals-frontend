// Bogdan
import { JSX } from "react";
import { Profile } from "../components/profile/Profile";
import { useEffect, useState } from 'react';
import { DisplayProfile } from "../components/profile/DisplayProfile";
import { DeleteProfileButton } from "../components/profile/DeleteProfileButton";
import { UpdateProfileButton } from "../components/profile/UpdateProfileButton";
import { ReadAllCars } from "../components/car/ReadAllCars";
import { AddCarButton } from "../components/car/AddCarButton";
import NearbyMap from "../components/profile/NearbyMap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Car } from "../components/car/Car";
import { fetchProfile } from "../components/profile/FetchProfile";
import { AdminDashboard } from "../components/profile/AdminDashboard";
import { AuthContext } from "../AuthContext";
import { ThemeToggle } from "../components/profile/ThemeToggle";
import { useCookies } from "react-cookie";

/**
 * profileProfile component that displays a profile's profile details.
 * @returns {JSX.Element} The rendered profile page, which includes the profile's details and options to update or delete the profile.
 */
export function ProfilePage(): JSX.Element {
    const [profile, setProfile] = useState<Profile>();
    const navigate = useNavigate();
    const { username  } = useContext(AuthContext);
    const [car, setAddedCar] = useState<Car>();
    const params = useParams();
    const [cookies, , removeCookie] = useCookies(["lastCarId"]);

    useEffect(() => {
        if (!fetchProfile(username, setProfile) || !username || !params.username) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (!params.username || params.username != username) {
            navigate(`/`);
        }
    }, [username, navigate, profile, car]);
    

    function handleClick() {
        const lastCarId = cookies.lastCarId;
        if (lastCarId) {
            removeCookie('lastCarId', { path: '/' });
            navigate(`/${username}/${lastCarId}`);
        }
    }

    return (
        <>  
            {profile && (
            <div style={{ display: 'flex', gap: '20px', width: '100%', marginBottom: "20px", marginTop: "10px" }}>
                <div style={{ flex: 1 }}>
                    <DisplayProfile profile={profile} />
                    <UpdateProfileButton profile={profile} setProfile={setProfile} />
                    <DeleteProfileButton adminDelete={false} profile={profile} />
                </div>
                <div style={{ flex: 1, margin: '5px', minWidth: "500px" }}>
                <NearbyMap location={{ lat: profile.coordinates[0], lng: profile.coordinates[1] }} />
                </div>
            </div>
            )}
            {profile && (
                <> 
                    <ThemeToggle/>
                    {cookies.lastCarId && (
                        <button onClick={handleClick}>Go Back to your Last Viewed Car</button>
                    )}
                    <ReadAllCars username={username} refreshTrigger={car}/>
                    <AddCarButton setAddedCar={setAddedCar}/>
                    {profile.isAdmin && <AdminDashboard/>}
                </>
            )}
        </>
    )
}

