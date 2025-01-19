import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "@/providers/UserProvider";
import { toast } from "@/hooks/use-toast";
interface ProtectedRouteProps {
  element: JSX.Element;
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
