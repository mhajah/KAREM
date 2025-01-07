import { Request, Response } from 'express';
import fs from 'fs';
import { exec } from 'child_process';
import { taskCollection, userCollection } from '../config/db';
import { ObjectId } from 'mongodb';
import util from 'util';
import { User } from '../models/user';

const execPromise = util.promisify(exec);

export const runScript = async (req: Request, res: Response) => {
    try {
        const { code, taskID, userID } = req.body;

        const task = await taskCollection.findOne({ _id: new ObjectId(taskID) });
        const user = await userCollection.findOne({ _id: new ObjectId(userID) }) as User | null;

        const hasTask = user?.completedTasks?.some(task => task.taskId.toString() === taskID);
        const userTaskIndex = user?.completedTasks?.findIndex(task => task.taskId.toString() === taskID);
        console.log('User task index:', userTaskIndex);
        console.log('Has task:', hasTask);
        
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        const testCases: { input: string, output: string }[] = task?.testCases;
        const maxTime = task?.maxTime; // Default 2000ms
        const maxMemory = task?.maxMemory || 50; // Default 50MB

        let passedTests = 0;
        const results = [];

        fs.writeFileSync('script.py', code);

        for (const [index, testCase] of testCases.entries()) {
            fs.writeFileSync('input.txt', testCase.input.replace(';', ' '));

            try {
                const start = Date.now();
                const { stdout, stderr } = await execPromise(`timeout ${maxTime / 1000}s python3 script.py < input.txt`, {
                    maxBuffer: maxMemory * 1024 * 1024 // Convert MB to bytes
                });
                const duration = Date.now() - start;

                if (stderr) {
                    results.push({
                        testCase: index + 1,
                        status: 'failure',
                        error: stderr.trim()
                    });
                    continue;
                }

                if (stdout.trim() !== testCase.output.trim()) {
                    results.push({
                        testCase: index + 1,
                        status: 'failure',
                        error: 'Output mismatch'
                    });
                    continue;
                }

                results.push({
                    testCase: index + 1,
                    status: 'success',
                    duration: `${duration}ms`
                });
                passedTests++;
            } catch (error: any) {
                if (error.killed) {
                    results.push({
                        testCase: index + 1,
                        status: 'failure',
                        error: 'Time limit exceeded'
                    });
                } else if (error.code === 137) {
                    results.push({
                        testCase: index + 1,
                        status: 'failure',
                        error: 'Memory limit exceeded'
                    });
                } else {
                    results.push({
                        testCase: index + 1,
                        status: 'failure',
                        error: error.message || 'Unknown error'
                    });
                }
            }
        }

        const taskStatus = testCases.length === passedTests ? 'success' : 'failure';
        const attempts = (userTaskIndex !== undefined && userTaskIndex !== -1) ? user?.completedTasks?.[userTaskIndex]?.attempts ?? 0 : 0;
        if (!hasTask) {
            console.log('Adding new task to user', userID, taskID);
            await userCollection.updateOne(
                { _id: new ObjectId(userID) },
                {
                    $push: {
                        completedTasks: {
                            taskId: new ObjectId(taskID),
                            completedAt: new Date(),
                            attempts: 1,
                            status: taskStatus
                        }
                    }
                }
            );
        } else {
            console.log('Updating existing task for user', userID, taskID);
            await userCollection.updateOne(
                { _id: new ObjectId(userID), 'completedTasks.taskId': new ObjectId(taskID) },
                {
                    $set: {
                        'completedTasks.$.completedAt': new Date(),
                        'completedTasks.$.status': taskStatus,
                        'completedTasks.$.attempts': attempts + 1
                    }
                }
            );
        }

        res.json({
            totalTests: testCases.length,
            passedTests,
            failedTests: testCases.length - passedTests,
            results
        });
    } catch (e: any) {
        console.error('Error running script:', e.message);
        res.status(500).json({ error: e.message });
    }
};
