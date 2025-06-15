/**
 * Login Form Component for the KAREM frontend.
 * Handles user authentication with form validation and error handling.
 * 
 * Features:
 * - Form validation using Zod schema
 * - Username/email and password authentication
 * - Error handling and display
 * - Integration with user context
 * 
 * Validation Rules:
 * - Username: Minimum 3 characters
 * - Password: Minimum 5 characters
 * 
 * UI Components:
 * - Form fields with labels and descriptions
 * - Error alerts for failed attempts
 * - Submit button with loading state
 * 
 * Integration:
 * - Uses React Hook Form for form management
 * - Connects with UserProvider for auth state
 * - Handles API errors gracefully
 * 
 * Note: Supports both username and email login
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "@/api/api";
import { useUser } from "@/providers/UserProvider";
import { useState } from "react";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nazwa użytkownika musi składać się przynajmniej 3 znaków.",
  }),
  password: z.string().min(5, {
    message: "Hasło musi składać się przynajmniej z 5 znaków.",
  }),
});

export function LoginForm() {
  const { login } = useUser();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = api.post("/login", {
        name: values.username,
        password: values.password,
      });
      const token = (await response).data.token;
      if (token) {
        login(token);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "Wystąpił nieznany błąd");
      }
    }
  }

  return (
    <Form {...form}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Błąd!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="jan.kowalski" {...field} />
              </FormControl>
              <FormDescription>Nazwa użytkownika lub email podany przy rejestracji</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="flex justify-end pt-8">
          <Button type="submit">Login</Button>
        </span>
      </form>
    </Form>
  );
}
