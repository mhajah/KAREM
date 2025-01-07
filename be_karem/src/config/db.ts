import { Collection, MongoClient } from 'mongodb';
import { User } from '../models/user';

const client = new MongoClient("mongodb://mongo:27017");
const db = client.db("mydatabase");

export const userCollection: Collection<User> = db.collection("users");
export const taskCollection = db.collection("tasks");

client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
