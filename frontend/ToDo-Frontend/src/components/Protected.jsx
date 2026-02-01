import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const hasToken = document.cookie.includes("token=");

  if (!hasToken) {
    return <Navigate to="/log-in" replace />;
  }

  return children;
}
