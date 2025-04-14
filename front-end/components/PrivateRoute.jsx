import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  // You can add a loading check here too if needed
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
