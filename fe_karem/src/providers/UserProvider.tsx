import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast"; 
import api from "@/api/api";
import { CompletedTask } from "@/api/api-endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  _id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  additionalUserData?: AdditionalUserData;
  completedTasks: CompletedTask[];  
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  login: (token: string) => void;
  isValid: boolean;
  role: string | null;
  roleValue: number;
  additionalUserData: AdditionalUserData | null;
}

interface UserTaskInfo {
  taskId: string;
  completedAt: Date;
  attempts: number;
  status: "success" | "failure" | "timeout";
}

interface AdditionalUserData {
  completedTasks: UserTaskInfo[];
}

interface CurrentUserQueryData {
  verifiedUser: User; 
  additionalData: AdditionalUserData; 
}


interface UserContextType {
  user: User | null;
  loading: boolean; 
  isValid: boolean; 
  role: string | null; 
  completedTasks: CompletedTask[] | null; 

  logout: () => void;
  login: (token: string) => void;

  roleValue: number;
}

const roleLevel = {
  admin: 100,
  teacher: 2,
  student: 1,
} as const;

const UserContext = createContext<UserContextType | null>(null);

const fetchCurrentUser = async (): Promise<CurrentUserQueryData | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
     console.log("No token found, skipping user fetch.");
    return null;
  }

  try {
    const verifyResponse = await api.post("/verify-token", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const verifiedUser = verifyResponse.data.user as User;
    console.log("Token verified. Verified user:", verifiedUser);

    const additionalDataResponse = await api.post("/get-user-data"); 
    const additionalData = additionalDataResponse.data as AdditionalUserData;
    console.log("Additional user data fetched:", additionalData);

    const combinedUserData: CurrentUserQueryData = {
      verifiedUser: verifiedUser,
      additionalData: additionalData,
    };

    return combinedUserData;

  } catch (error) {
     console.error("Failed to fetch current user data:", error);
     throw new Error("Failed to fetch current user data");
  }
};


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isFetching, isSuccess } = useQuery<CurrentUserQueryData | null, Error>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!localStorage.getItem("token"),
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const login = (token: string) => {
    try {
      localStorage.setItem("token", token);

      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      toast({
        title: "Zalogowano",
        description: "Zostałeś pomyślnie zalogowany.",
        duration: 4000,
      });


    } catch (err: unknown) {
       console.error("Login error:", err);
       toast({
         title: "Błąd logowania",
         description: "Wystąpił błąd podczas logowania.",
         variant: "destructive"
       });
    }
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");

    queryClient.removeQueries({ queryKey: ["currentUser"] });

    toast({
      title: "Wylogowano",
      description: "Zostałeś wylogowany.",
      duration: 4000,
    });

  };

  const user = data?.verifiedUser || null;
  const loading = isLoading || isFetching;
  const isValid = isSuccess && !!data;
  const role = user?.role || null;
  const roleValue = role ? roleLevel[role as keyof typeof roleLevel] : 0;

  return (
    <UserContext.Provider value={{
        user,
        loading,
        logout,
        login,
        additionalUserData: data?.additionalData || null,
        isValid,
        role,
        roleValue,
        completedTasks: data?.additionalData?.completedTasks as CompletedTask[] || null
     }}>
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