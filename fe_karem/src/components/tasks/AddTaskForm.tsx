/**
 * Add Task Form Component for the KAREM frontend.
 * Provides a comprehensive form for creating new programming tasks.
 * 
 * Features:
 * - Multi-field form with validation
 * - Dynamic test case management
 * - Tag selection from existing tags
 * - Resource limits configuration
 * 
 * Form Fields:
 * - Task name and description
 * - Difficulty level selection
 * - Active status toggle
 * - Tag selection
 * - Test cases (input/output pairs)
 * - Resource limits (attempts, time, memory)
 * 
 * Validation:
 * - Required fields validation
 * - Numeric value validation
 * - Test case validation
 * - Tag format validation
 * 
 * Integration:
 * - Uses React Hook Form with Zod validation
 * - Connects with task management API
 * - Updates task list on success
 * - Handles API errors gracefully
 * 
 * Note: Form includes automatic task list refresh
 * and success notification on submission
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { FancyMultiSelect } from "../ui/fancy-multiselect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { toast } from "@/hooks/use-toast";
import api from "@/api/api";
import { AxiosError } from "axios";
import { useUser } from "@/providers/UserProvider";
import { Task, useTasks } from "@/api/api-endpoints";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Minimum 2 znaki.",
  }),
  difficulty: z.string().refine((value) => ["easy", "medium", "hard"].includes(value), {
    message: "Wybierz poziom trudności.",
  }),
  enabled: z.boolean(),
  tags: z.array(z.string()),
  description: z.string().min(10, {
    message: "Minimum 10 znaków.",
  }),
  maxAttempts: z
    .string({
      message: "Pole wymagane.",
    })
    .refine((value) => parseInt(value) > 0, {
      message: "Wartość musi być większa od 0.",
    }),
  maxTime: z
    .string({
      message: "Pole wymagane.",
    })
    .refine((value) => parseInt(value) > 0, {
      message: "Wartość musi być większa od 0.",
    }),
  maxMemory: z
    .string({
      message: "Pole wymagane.",
    })
    .refine((value) => parseInt(value) > 0, {
      message: "Wartość musi być większa od 0.",
    }),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input jest wymagany."),
        output: z.string().min(1, "Output jest wymagany."),
      }),
    )
    .nonempty("Musisz podać co najmniej jeden przypadek testowy."),
});

export function AddTaskForm({
  tasks,
  setIsDialogOpen,
}: {
  tasks: Task[];
  setIsDialogOpen: (state: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useTasks()
  const { user } = useUser();

  const tagsOptions = Array.from(new Set(tasks?.map((task) => task.tags)?.flat()));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      difficulty: "",
      enabled: true,
      tags: [],
      description: "",
      testCases: [],
      maxAttempts: "",
      maxTime: "",
      maxMemory: "",
    },
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/add-task", {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: user?.name,
      });
      const id = response.data.id;
      if (id) {
        toast({
          title: "Dodano",
          description: "Zadanie zostało dodane.",
          duration: 8000,
        });
        refetch();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "Wystąpił nieznany błąd");
      }
    }
  };

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
        <div className="grid grid-cols-12 gap-3">
          <span className="col-span-12">
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Czy aktywne?</FormLabel>
                    <FormDescription>
                      Nieaktywne zadania nie będą widoczne dla uczniów. Możesz je włączyć w każdej chwili.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa zadania</FormLabel>
                  <FormControl>
                    <Input placeholder="Stokrotki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-6">
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poziom trudności</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="easy">Łatwy</SelectItem>
                          <SelectItem value="medium">Średni</SelectItem>
                          <SelectItem value="hard">Trudny</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-12">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis zadania</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Zadanie „Stokrotki” polega na znalezieniu podciągu sąsiadujących elementów w tablicy, którego średnia arytmetyczna jest największa. Wykorzystuje się do tego techniki programowania dynamicznego lub sum prefiksowych, aby efektywnie obliczać sumy podciągów. Kluczowe jest zoptymalizowanie procesu przeszukiwania przedziałów, aby uniknąć sprawdzania każdego możliwego podciągu."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-4">
            <FormField
              control={form.control}
              name="maxAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liczba prób</FormLabel>
                  <FormControl>
                    <Input className="text-right" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-4">
            <FormField
              control={form.control}
              name="maxTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Czas (ms)</FormLabel>
                  <FormControl>
                    <Input className="text-right" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-4">
            <FormField
              control={form.control}
              name="maxMemory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pamięć (MB)</FormLabel>
                  <FormControl>
                    <Input className="text-right" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-12">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategorie</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      onChange={(values) => {
                        field.onChange(values.map(({ value }) => value));
                      }}
                      options={tagsOptions?.map((tag) => ({ value: tag, label: tag })) || []}
                    />
                  </FormControl>
                  <FormDescription className="-mt-2">Zacznij wpisywać lub wybierz z listy</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="col-span-12">
            <FormField
              control={form.control}
              name="testCases"
              render={() => (
                <FormItem>
                  <FormLabel>Przypadki testowe</FormLabel>
                  <FormDescription>
                    Dodaj przypadki testowe z przykładowymi danymi wejściowymi i oczekiwanymi wynikami. Kolejne argumenty rozdziel
                    średnikami. Elementy tablicowe umieść w nawiasach kwadratowych. Na przykład: [1,2,3];[4,5,6].
                  </FormDescription>
                  <FormControl>
                    <div>
                      {form.watch("testCases")?.map((_, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2">
                          <Input placeholder="Input" {...form.register(`testCases.${index}.input` as const)} />
                          <Input placeholder="Output" {...form.register(`testCases.${index}.output` as const)} />
                          <Button type="button" variant="destructive" onClick={() => remove(index)}>
                            Usuń
                          </Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => append({ input: "", output: "" })}>
                        Dodaj przypadek testowy
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
        </div>

        <span className="flex justify-end pt-8">
          <span className="flex justify-end pt-8">
            <Button type="submit">Dodaj</Button>
          </span>
        </span>
      </form>
    </Form>
  );
}
