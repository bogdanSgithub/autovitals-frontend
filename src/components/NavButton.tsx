import { JSX } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

interface NavButtonProps {
  to: string;
  className?: string;
  label: string;
}

/**
 * NavButton component that renders a button styled as a navigation link.
 * It uses cookies to determine the current theme (light or dark) for styling.
 * @param {NavButtonProps} props - The properties for the NavButton component.
 * @returns {JSX.Element} The rendered NavButton component.
 */
export function NavButton({ to, className, label }: NavButtonProps): JSX.Element {
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "light";

  const buttonStyle: React.CSSProperties = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  const pStyle: React.CSSProperties = {
    margin: 0,
  };

  return (
    <NavLink to={to}>
      <button style={buttonStyle} id={className}>
        <p style={pStyle}>{label}</p>
      </button>
    </NavLink>
  );
}
