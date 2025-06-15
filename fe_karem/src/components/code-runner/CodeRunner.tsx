/**
 * Code Runner Component for the KAREM frontend.
 * Provides an interactive Python code editor with execution capabilities.
 * 
 * Features:
 * - Syntax-highlighted code editor using CodeMirror
 * - Python code execution with test cases
 * - Real-time code execution feedback
 * - Task completion tracking
 * 
 * Components:
 * - CodeMirror editor with Python support
 * - Execution results display
 * - Success/failure notifications
 * - Task completion status
 * 
 * Integration:
 * - Uses React Query for API calls
 * - Integrates with user authentication
 * - Tracks task completion status
 * - Provides visual feedback for execution results
 * 
 * Note: Code execution is rate-limited and requires authentication
 */

import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useUser } from "@/providers/UserProvider";
import { Alert } from "../ui/alert";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

export interface CodeRunInput {
  code: string;
  taskID?: string; 
  userID?: string; 
}

export interface CodeRunOutput {
  stdout?: string; 
  stderr?: string;
  error?: string; 
}

function CodeRunner({ taskID }: { taskID?: string }) {
  const [code, setCode] = useState("");

  const { user, completedTasks } = useUser();

  const { toast } = useToast(); 

  const runCodeMutation = useMutation<CodeRunOutput, Error, CodeRunInput>({
    mutationFn: (data: CodeRunInput) =>
      api.post<CodeRunOutput>("/run", data).then((res) => res.data),
    onSuccess: () => {
      toast({
        title: "Kod uruchomiony",
        description: "Pomyślnie uruchomiono kod.",
      });
    },
    onError: (error) => {
      toast({
        title: "Błąd uruchomienia kodu",
        description: `Wystąpił błąd: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (runCodeMutation.isPending) {
        return;
    }

    if (!user?._id) {
        toast({
             title: "Błąd",
             description: "Musisz być zalogowany, aby uruchomić kod.",
             variant: "destructive",
        });
        return;
    }

    runCodeMutation.mutate({ code, taskID, userID: user._id });
  };

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const userTask = completedTasks?.find((task) => task.taskId === taskID);

  return (
    <>
      {userTask && userTask.status === "success" && (
        <Alert className="mt-4 text-green-500 bg-green-100">
          <p>To zadanie zostało już przez Ciebie rozwiązane pomyślnie.</p>
        </Alert>
      )}

      <div className="bg-background-color mt-10">
        <form onSubmit={handleSubmit}>
          <CodeMirror
            value={code}
            height="400px"
            theme={vscodeDark}
            extensions={[python()]}
            onChange={handleCodeChange}
            placeholder="Umieść swój kod tutaj..."
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={runCodeMutation.isPending || !user?._id}
          >
            {runCodeMutation.isPending ? "Uruchamianie..." : "Uruchom"}
          </button>
        </form>

         {runCodeMutation.isPending && <div>Uruchamianie kodu...</div>}

         {runCodeMutation.isError && (
             <div className="text-red-500 mt-4">Błąd: {runCodeMutation.error.message}</div>
         )}

        {runCodeMutation.isSuccess && runCodeMutation.data && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Wynik wykonania:</h3>
            <pre className="bg-gray-900 text-gray-200 p-4 rounded-md mt-2">
              {runCodeMutation.data.stdout && <div>{runCodeMutation.data.stdout}</div>}
              {runCodeMutation.data.stderr && <div className="text-yellow-500">{runCodeMutation.data.stderr}</div>}
              {runCodeMutation.data.error && <div className="text-red-500">{runCodeMutation.data.error}</div>}
              {!runCodeMutation.data.stdout && !runCodeMutation.data.stderr && !runCodeMutation.data.error &&
                JSON.stringify(runCodeMutation.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

export default CodeRunner;
