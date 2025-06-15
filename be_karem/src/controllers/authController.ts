/**
 * Authentication Controller for the KAREM backend.
 * Handles user authentication, registration, and token verification.
 * 
 * Features:
 * - User login with email/username and password
 * - User registration with secure password hashing
 * - JWT token verification
 * - Role-based access control
 * 
 * Security:
 * - Passwords are hashed using SHA-256 with salt
 * - JWT tokens expire after 15 minutes
 * - Email/username uniqueness validation
 * 
 * Note: SECRET_KEY should be moved to environment variables in production
 */

import { Request, Response } from 'express';
import { userCollection } from '../config/db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';

const SECRET_KEY = 'secret_key';

export const verifyToken = async (req: Request, res: Response) => {
    const newObjectId = new ObjectId((req as any).user.id);
    try {
        const user = await userCollection.findOne({ _id: newObjectId });
        res.json({
            message: 'Token is valid',
            user: user,
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


export const login = async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;

    const user = await userCollection.findOne({ $or: [{ name }, { email: name }] });
    if (!user) {
        res.status(401).json({ error: "Nie znaleziono użytkownika." });
        return;
    }

    const hash = crypto.createHash('sha256');
    hash.update(password + user.salt);
    const passwordHash = hash.digest('hex');

    if (passwordHash !== user.password) {
        res.status(401).json({ error: "Nieprawidłowe hasło." });
        return;
    }

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, SECRET_KEY, { expiresIn: '15m' });
    res.json({ token });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, password, email } = req.body;

    const existingUser = await userCollection.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
        res.status(400).json({ error: 'Użytkownik już istnieje.' });
        return;
    }

    const salt = crypto.randomBytes(8).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    const passwordHash = hash.digest('hex');

    const result = await userCollection.insertOne({ name, password: passwordHash, salt, email, role: 'student', completedTasks: [], });
    res.json({ id: result.insertedId });
};
