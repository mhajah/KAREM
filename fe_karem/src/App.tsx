import { useState } from 'react';
import './App.css'
import axios, { AxiosError } from 'axios';

function App() {

  const [code, setCode] = useState('');
  const [result, setResult] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/run-python', { code });
      setResult(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      setResult(`Error: ${axiosError.response?.data}`);
    }
  };

  return (
    <div>
      <h1>Python Code Runner</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={50} />
        <br />
        <button type="submit">Run Code</button>
      </form>
      <h2>Result</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default App
