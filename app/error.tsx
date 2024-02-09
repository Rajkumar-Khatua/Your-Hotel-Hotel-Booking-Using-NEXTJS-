"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
interface ErrorProps {
  error: Error;
}

const ErrorState: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Oops, something went wrong"
      subtitle="Seems like we couldn't load the page. Please try again."
    />
  );
};

export default ErrorState;
