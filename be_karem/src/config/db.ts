import { Collection, MongoClient } from 'mongodb';
import { User } from '../models/user';
import { Task } from '../models/task';

const client = new MongoClient("mongodb://mongo:27017");
const db = client.db("mydatabase");

export const userCollection: Collection<User> = db.collection("users");
export const taskCollection: Collection<Task> = db.collection("tasks");
export const classCollection = db.collection("classes");

client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
