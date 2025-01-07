import { Response } from 'express';
import { taskCollection } from '../config/db';
import { ObjectId } from 'mongodb';
import { Task } from '../models/task';

// Endpoint for add task
export const addTask = async (req: any, res: Response) => {
    try {
        const task: Task = req.body;
        if (task._id) {
            task._id = new ObjectId(task._id);
        }
        const result = await taskCollection.insertOne(task);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Endpoint for get all tasks
export const getTasks = async (req: any, res: Response) => {
    try {
        const tasks = await taskCollection.find().toArray();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Endpoint for get task by id
export const getTaskById = async (req: any, res: Response) => {
    try {
        const task = await taskCollection.findOne({ _id: new ObjectId(req.body.id) });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Endpoint for edit task by id
export const editTaskById = async (req: any, res: Response) => {
    try {
        const task: Task = req.body;
        const oldTask = await taskCollection.findOne({ _id: new ObjectId(task.id) });
        const updatedTask = { ...oldTask, ...task };
        const result = await taskCollection.updateOne({ _id: new ObjectId(task.id) }, { $set: updatedTask });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Endpoint for delete task by id
export const deleteTaskById = async (req: any, res: Response) => {
    try {
        const result = await taskCollection.deleteOne({ _id: new ObjectId(req.body.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};