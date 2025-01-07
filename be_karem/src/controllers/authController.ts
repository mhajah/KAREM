import { Request, Response } from 'express';
import { userCollection } from '../config/db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SECRET_KEY = 'secret_key';

export const verifyToken = (req: Request, res: Response) => {
    res.json({
        message: 'Token is valid',
        user: (req as any).user,
    });
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

    const result = await userCollection.insertOne({ name, password: passwordHash, salt, email, role: 'student', completedTasks: [] });
    res.json({ id: result.insertedId });
};
