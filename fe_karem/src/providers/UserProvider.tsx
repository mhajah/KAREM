import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/api";

interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  login: (token: string) => void;
  isValid: boolean;
  role: string | null;
  roleValue: number;
}

const roleLevel = {
  admin: 100,
  teacher: 2,
  student: 1,
} as const;

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const { toast } = useToast();

  const token = localStorage.getItem("token");

  const login = (token: string) => {
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
    setRole(decoded.role);
    setIsValid(true);
    localStorage.setItem("token", token);
    toast({
      title: "Zalogowano",
      description: "Zostałeś pomyślnie zalogowany.",
      duration: 4000,
    });
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsValid(false);
    setRole(null);
    setLoading(false);
    toast({
      title: "Wylogowano",
      description: "Zostałeś wylogowany.",
      duration: 4000,
    });
    console.log("Logged out");
  };

  const verifyToken = async () => {
    console.log("Verifying token...");
    if (!token) {
      setIsValid(false);
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const verifiedUser = response.data.user;
      setUser(verifiedUser);
      setIsValid(true);
      setRole(verifiedUser.role);
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  const roleValue = role ? roleLevel[role as keyof typeof roleLevel] : 0;

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, login, isValid, role, roleValue }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
