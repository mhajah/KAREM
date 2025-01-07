import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useUser } from "@/providers/UserProvider";

function CodeRunner({ taskID }: { taskID: string }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5175/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, taskID, userID: user?.id }),
    });

    const data = await response.json();
    setOutput(data);
  };

  return (
    <div className="bg-background-color mt-10">
      <form onSubmit={handleSubmit}>
        <CodeMirror
          value={code}
          height="400px"
          theme={vscodeDark}
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          placeholder="Umieść swój kod tutaj..."
        />
        <br />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Run
        </button>
      </form>
      {output && (
        <div>
          <pre className="bg-gray-900 text-gray-200 p-4 rounded-md mt-4">{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeRunner;
