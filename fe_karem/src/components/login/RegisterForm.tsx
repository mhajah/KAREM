import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "@/api/api";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Nazwa użytkownika musi składać się przynajmniej 3 znaków.",
    }),
    email: z.string().email({
      message: "Nieprawidłowy format adresu email.",
    }),
    password: z.string().min(5, {
      message: "Hasło musi składać się przynajmniej z 5 znaków.",
    }),
    confirmPassword: z.string().min(5, {
      message: "Hasło musi składać się przynajmniej z 5 znaków.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Podane hasła są różne.",
    path: ["confirmPassword"],
  });

export function RegisterForm({ triggerRef }: { triggerRef: React.RefObject<HTMLButtonElement> }) {
  const { toast } = useToast();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = api.post("/register", {
        name: values.username,
        password: values.password,
        email: values.email,
      });
      const id = (await response).data.id;
      if (id) {
        triggerRef.current?.click();
        toast({
          title: "Zarejestrowano",
          description: "Zostałeś pomyślnie zarejestrowany. Teraz możesz się zalogować.",
          duration: 8000,
        });
      }
    } catch (error) {
      console.error("Failed to register", error);
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
              <FormLabel>Nazwa użytkownika</FormLabel>
              <FormControl>
                <Input placeholder="jan.kowalski" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres email</FormLabel>
              <FormControl>
                <Input placeholder="jan.kowalski@karam.com" {...field} />
              </FormControl>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="flex justify-end pt-8">
          <Button type="submit">Zarejestruj</Button>
        </span>
      </form>
    </Form>
  );
}
