import { createContext, useContext } from "react";

export const CarContext = createContext<{
  onDelete: (id: string) => void;
} | null>(null);

export function useCarContext() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext must be used inside CarContext.Provider");
  }
  return context;
}