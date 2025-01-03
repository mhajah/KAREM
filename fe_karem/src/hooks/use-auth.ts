import { useEffect, useState } from "react";
import api from "@/api/api";
import { useUser } from "@/providers/UserProvider";
import { roleLevel } from "@/constants";

interface AuthResult {
  isValid: boolean;
  role: string | null;
  loading: boolean;
  roleValue: number;
}

export const useAuth = (): AuthResult => {
  const { setUser, logout } = useUser();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
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
      if (verifiedUser.role) setRole(verifiedUser.role);
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
      setIsValid(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  let roleValue;
  if (role) {
    roleValue = roleLevel[role as keyof typeof roleLevel];
  }

  return { isValid, role, loading, roleValue: roleValue ?? 0 };
};
