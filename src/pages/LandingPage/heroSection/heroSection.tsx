import './heroSection.css';
import Buttons from "../Buttons/Buttons";
import BenefitsList from './BenefitsList/BenefitList';
import HeroSectionText from './HeroSectionText/HeroSectionText';
import HeroSectionTitle from './HeroSectionTitle';
import HeroSectionImage from './HeroSectionImage';
import { JSX } from "react";

export default function HeroSection(): JSX.Element {
  return (
    <div className="HeroSection">
      <div className="HeroSectionContent">
        <HeroSectionTitle />
        <HeroSectionText />
        <BenefitsList />
        <Buttons />
      </div>

      <HeroSectionImage />
    </div>
  );
}
