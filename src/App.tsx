import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { InvalidPage } from './pages/InvalidPage'
import { ProfilePage } from "./pages/ProfilePage";
import { Home } from './pages/Home'
import { LoginForm } from './components/user/LoginForm'
import { SignUpForm } from './components/user/SignUpForm'
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import { SidebarSearch } from './components/maintenance/SidebarSearch';
import { AddMaintenanceRecordsForm } from './components/maintenance/AddMaintenanceRecordsForm';
import { AddProfileForm } from './components/profile/AddProfileForm';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Bogdan
  useEffect(() => {
    async function checkForLoggedIn() {
      try {
        /** Call auth, passing cookies to the back-end */
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/session/auth`, { method: "GET", credentials: "include" });
        if (response.status === 200) {
          setIsLoggedIn(true);
          const user = await response.text();
          setUsername(user);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkForLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />}/>
          <Route path="signup" element={<SignUpForm />}/>
          <Route path=":username/startup" element={<AddProfileForm username={username}/>}/>
          {/*<Route path='readCar' element={<ReadCarPage />} />*/}
          <Route path=":username/:carId/maintenance" element={<AddMaintenanceRecordsForm/>}/>
          <Route path=":username/:carId" element={<SidebarSearch/>}/>
          <Route path='profile/:username' element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<InvalidPage/>} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
