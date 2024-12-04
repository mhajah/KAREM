const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Domena frontendu
    methods: ['GET', 'POST'],       // Metody HTTP dozwolone
    allowedHeaders: ['Content-Type'] // Nagłówki dozwolone
};

app.use(cors(corsOptions));
app.use(express.json());

// Połączenie z MongoDB
const client = new MongoClient("mongodb://mongo:27017");
let collection;

client.connect().then(() => {
  const db = client.db("mydatabase");
  collection = db.collection("users");
  console.log("Connected to MongoDB");
});

const PORT = 5175;

// Endpointy
app.post("/add_user", async (req, res) => {
    const result = await collection.insertOne({ name: req.body.name });
    res.json({ id: result.insertedId });
  });
  
app.get("/get_users", async (req, res) => {
    const users = await collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
    res.json(users);
  });
  

app.post('/run', (req, res) => {
    try {
        const { code } = req.body;

        fs.writeFileSync('script.py', code);

        exec('python3 script.py', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.json({
                stdout: stdout,
                stderr: stderr
            });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
