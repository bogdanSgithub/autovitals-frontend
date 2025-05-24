import { JSX } from "react";
import "./searchbar.css";

interface SearchBarProps {
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  


export default function SearchBar({ search, onSearchChange, }: SearchBarProps) : JSX.Element {
    return (
      <div className="search-section">
        <input
          type="text"
          placeholder="Search a car part..."
          className="search-input"
          value={search}
          onChange={onSearchChange}
        />
        <button className="search-button">Search</button>
      </div>
    );
  }
  