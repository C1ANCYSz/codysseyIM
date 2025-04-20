import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Store the current location before checking login status
    localStorage.setItem("lastLocation", location.pathname);
    console.log(location.pathname);
    const checkLogin = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include", // Sends cookie
        });

        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
          // Redirect to the last location if available
          const lastLocation = localStorage.getItem("lastLocation");
          console.log(lastLocation);
          if (lastLocation) {
            navigate(lastLocation, { replace: true });
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [isLoggedIn, setIsLoggedIn, user, setUser, isLoading, setIsLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
