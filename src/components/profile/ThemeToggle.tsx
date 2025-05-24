import { useEffect } from "react";
import { useCookies } from "react-cookie";


/**
 * ThemeToggle component that allows users to switch between light and dark themes.
 * It uses cookies to remember the user's theme preference.
 * @returns {JSX.Element} The rendered ThemeToggle button.
 */
export function ThemeToggle() {
    const [cookies, setCookie] = useCookies(["theme"]);
    const currentTheme = cookies.theme || "light";

    const toggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setCookie("theme", newTheme, { path: "/", maxAge: 31536000 });
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
    }, [currentTheme]);

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {currentTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
    );
}