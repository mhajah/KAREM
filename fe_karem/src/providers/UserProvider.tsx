import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  role?: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  login: (token: string) => void;
} | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = (token: string) => {
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
    localStorage.setItem("token", token);
    toast({
      title: "Zalogowano",
      description: "Zostałeś pomyślnie zalogowany.",
      duration: 4000,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast({
      title: "Wylogowano",
      description: "Zostałeś pomyślnie wylogowany.",
      duration: 4000,
    });
    console.log("Logged out");
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  return <UserContext.Provider value={{ user, setUser, logout, login }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
