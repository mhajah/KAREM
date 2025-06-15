/**
 * Protected Route Component for the KAREM frontend.
 * Implements role-based route protection and authentication checks.
 * 
 * Features:
 * - Role-based access control
 * - Authentication state verification
 * - Automatic redirection for unauthorized access
 * - Loading state handling
 * 
 * Protection Levels:
 * - Admin routes: minRoleValue = 100
 * - Teacher routes: minRoleValue = 2
 * - Student routes: minRoleValue = 1
 * 
 * Behavior:
 * - Checks authentication status on mount
 * - Redirects to home if unauthorized
 * - Shows loading state during auth check
 * - Displays toast notification on access denial
 * 
 * Usage:
 * - Wrap protected routes with this component
 * - Specify minimum role value required
 * - Component handles all auth logic automatically
 */

import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "@/providers/UserProvider";
import { toast } from "@/hooks/use-toast";
interface ProtectedRouteProps {
  element: React.ReactNode;
  minRoleValue: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, minRoleValue }) => {
  const auth = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loading && (!auth.isValid || auth.roleValue < minRoleValue)) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz dostępu do tej strony.",
        duration: 2000,
        variant: "destructive",
      });
      navigate({ to: "/", replace: true });
    }
  }, [auth.loading, auth.isValid, auth.roleValue, minRoleValue, navigate]);

  if (auth.loading) {
    return <>Loading...</>;
  }

  if (!auth.isValid || auth.roleValue < minRoleValue) {
    return null;
  }

  return element;
};

export default ProtectedRoute;
