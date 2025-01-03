import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://mongo:27017");
const db = client.db("mydatabase");

export const userCollection = db.collection("users");

client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
