import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [userRole, setUserRole] = useState(null);
  // Check login status from backend on first mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include", // Sends cookie
        });

        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true);
          setUserRole(data.role);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }),
    [isLoggedIn, setIsLoggedIn, userRole, setUserRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
