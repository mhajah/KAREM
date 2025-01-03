import { Request, Response } from 'express';
import { userCollection } from '../config/db';
import { ObjectId } from 'mongodb';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userCollection.find({}).toArray();
  res.json(users);
};

export const changeRole = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { id, role } = req.body;

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid user ID' });
            return;
        }

        const newObjectId = new ObjectId(id);

        const user = await userCollection.findOneAndUpdate(
            { _id: newObjectId },
            { $set: { role: role } },
            { returnDocument: 'after' } 
        );

        if (!user) {
           res.status(404).json({ error: 'User not found' });
           return;
        }

        console.log('User role changed:', user?.name, user?.role);
        res.json(user?.role);
    } catch (error) {
        console.error('Error changing user role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

