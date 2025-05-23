import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer";
import { JSX } from "react";

/**
 * The main layout of the application, the footer, the outlet (the page component like Home.tsx), and the footer.
 * @returns The layout.
 */
export function MainLayout(): JSX.Element  {
   return <div>
            <Header />
            <Outlet />
            <Footer />		
          </div>
}   
