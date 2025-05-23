import VehicleSearchForm from "./VehicleSearchForm/VehicleSearchForm";
import { CommonProblemsFormText } from "./CommonProblemsFormText/CommonProblemsFormText";
import { CommonProblemsFormTitle } from "./CommonProblemsFormTitle/CommonProblemsFormTitle";
import { JSX } from "react";

export function CommonProblemsForm() : JSX.Element {
    return (
        <div className="CommonProblemsFormContainer"> 
            <CommonProblemsFormTitle /> 
            <CommonProblemsFormText /> 
            <VehicleSearchForm /> 
        </div>
    )
}