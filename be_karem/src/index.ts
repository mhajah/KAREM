import express, { Express, Request, Response } from "express";

import bodyParser from "body-parser";
import { exec } from 'child_process';
const cors = require('cors');
import fs from 'fs';
import path from 'path';

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.post('/run-python', (req: Request, res: Response) => {
  const code = req.body.code;
  const filePath = path.join(__dirname, 'kod.py');
  
  fs.writeFileSync(filePath, code);
  
  exec(`docker run --rm -v ${filePath}:/app/kod.py python:3.9 python /app/kod.py`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    res.send(`Output: ${stdout}`);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3001');
});
