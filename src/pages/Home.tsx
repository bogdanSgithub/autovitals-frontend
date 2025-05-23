import { JSX } from "react";
import HeroSection from "./LandingPage/heroSection/heroSection";
import { CommonProblemsForm } from "./LandingPage/CommonProblemsForm/CommonProblemsForm";

export function Home(): JSX.Element {
    return (
        <>  
            <HeroSection />
            <CommonProblemsForm />
        </>
    );
}