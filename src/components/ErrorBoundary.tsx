// Bogdan
import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

/**
 * Puts an error boundary that displays a fallback UI if an error occurs.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - The components to render inside the error boundary.
 * @param {ReactNode} props.fallback - The fallback UI to display when an error is caught.
 * @returns {JSX.Element} The ErrorBoundary component.
 */
export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary fallback={fallback}>
      {children}
    </ReactErrorBoundary>
  );
}