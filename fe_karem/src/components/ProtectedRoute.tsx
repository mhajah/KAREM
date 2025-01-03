import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "@/providers/UserProvider";

interface ProtectedRouteProps {
  element: React.ReactNode;
  minRoleValue: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, minRoleValue }) => {
  const auth = useUser();
  const navigate = useNavigate();

  if (auth.loading) {
    return null;
  }
  if (!auth.isValid || auth.roleValue < minRoleValue) {
    navigate({ to: "/" });
    return null;
  }
  return element;
};

export default ProtectedRoute;
