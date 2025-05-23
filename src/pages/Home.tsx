import { JSX } from "react";
import HeroSection from "./LandingPage/heroSection/heroSection";
import { CommonProblemsForm } from "./LandingPage/CommonProblemsForm/CommonProblemsForm";

export function Home(): JSX.Element {
    return (
        <>  
            <HeroSection />
            <CommonProblemsForm />
            <section style={{ padding: "1rem", marginTop: "1rem" }}>
                <h2>About Us</h2>
                <p>
                    We are John Abbott College Computer science CEGEP students in our 2nd year.
                </p>
            </section>

            <section style={{ padding: "1rem", marginTop: "1rem", maxWidth: "500px", margin: "1rem auto" }}>
                <h2>Inspiration</h2>
                <p>
                    We noticed that keeping track of maintenances can be challenging and time-consuming.  
                    This inspired us to develop a solution that makes managing maintenance schedules easier and more efficient for everyone.
                </p>
            </section>
        </>
    );
}