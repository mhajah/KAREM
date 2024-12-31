import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  element: React.ReactNode;
  minRoleValue: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, minRoleValue }) => {
  const auth = useAuth();
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
