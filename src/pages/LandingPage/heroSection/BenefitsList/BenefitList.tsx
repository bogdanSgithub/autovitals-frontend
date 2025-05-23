import { JSX } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function BenefitsList() : JSX.Element {
  return (
    <div className="HeroSectionList">
      <ul>
        <li>
          <FaCheckCircle className="check-icon" />
          Identify common problems 
        </li>
        <li>
          <FaCheckCircle className="check-icon" />
          Save money on unnecessary repairs
        </li>
        <li>
          <FaCheckCircle className="check-icon" />
          Keep your vehicle running smoothly longer
        </li>
        <li>
          <FaCheckCircle className="check-icon" />
          Make informed maintenance decisions
        </li>
      </ul>
    </div>
  );
}
