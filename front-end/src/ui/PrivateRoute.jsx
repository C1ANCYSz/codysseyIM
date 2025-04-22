import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "./Loader";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) return <Loader />;

  // You can add a loading check here too if needed
  return isLoggedIn && user.isVerified ? (
    children
  ) : isLoggedIn && !user.isVerified ? (
    <Navigate to="/verify-email" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
