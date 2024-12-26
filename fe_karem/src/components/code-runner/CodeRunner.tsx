import { useState } from "react";

function CodeRunner() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5175/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setOutput(data);
  };

  return (
    <div>
      <h1>Run Python Code</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={50} />
        <br />
        <button type="submit">Run</button>
      </form>
      {output && (
        <div>
          <h2>Output:</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeRunner;
