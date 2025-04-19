import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check login status from backend on first mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include", // Sends cookie
        });

        const data = await res.json();
        if (data.success) {
          console.log(data);

          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
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
