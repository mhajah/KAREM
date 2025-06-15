/**
 * Database configuration and connection setup for the KAREM backend.
 * This file handles the MongoDB connection and exports collection references
 * for different data models.
 * 
 * Collections:
 * - users: Stores user data and authentication information
 * - tasks: Stores task-related data
 * - classes: Stores class information
 * 
 * Connection:
 * - Uses MongoDB running in a Docker container (mongo:27017)
 * - Automatically connects on application startup
 * - Logs connection status and errors
 */

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
