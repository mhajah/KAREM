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
import { DialogTrigger } from "@radix-ui/react-dialog";
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
      z.any().refine((value) => value, {
        message: "Minimum 1 znak.",
      }),
    )
    .nonempty({
      message: "Pole wymagane.",
    }),
});

export function EditTaskForm({ task }: { task: Task }) {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useTasks()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name || "",
      difficulty: task?.difficulty || "",
      enabled: task?.enabled || false,
      tags: task?.tags || [],
      description: task?.description || "",
      testCases: task?.testCases || [],
      maxAttempts: String(task?.maxAttempts) || "",
      maxTime: String(task?.maxTime) || "",
      maxMemory: String(task?.maxMemory) || "",
    },
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/edit-task-by-id", { id: task._id, ...values });
      if (response.status === 200) {
        refetch();
        toast({
          title: "Aktualizacja",
          description: "Zadanie zostało zaaktualizowane.",
          duration: 4000,
        });
      }
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
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                      options={[]}
                      value={field.value.map((tag) => ({ value: tag, label: tag }))}
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
                      <Button type="button" onClick={() => append({ input: [], output: [] })}>
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
          <DialogTrigger asChild>
            <Button type="submit">Aktualizuj</Button>
          </DialogTrigger>
        </span>
      </form>
    </Form>
  );
}
