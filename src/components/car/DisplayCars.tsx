import { JSX } from "react";
import { Car } from "./Car";
import { DisplayCar } from "./DisplayCar";

/**
 * @summary Displays a list of cars, used to display all cars in the database.
 * @param props The props for the component, which include the cars to display.
 * @param props.cars The cars to display.
 * @returns The cars in the database.
 */
export function DisplayCars(props: { cars: Car[] }): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "space-between",
      }}
    >
      {props.cars.map((car) => (
        <div
          key={car._id}
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            boxSizing: "border-box",
          }}
        >
          <DisplayCar car={car} />
        </div>
      ))}
    </div>
  );
}
