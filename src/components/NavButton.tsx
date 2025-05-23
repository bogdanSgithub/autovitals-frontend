import { JSX } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

interface NavButtonProps {
  to: string;
  className?: string;
  label: string;
}

/**
 * Renders a button component wrapped in a `NavLink` for navigation.
 * Applies styles based on the `theme` cookie ("light" or "dark").
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
