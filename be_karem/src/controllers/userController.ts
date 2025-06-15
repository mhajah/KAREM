/**
 * User Management Controller for the KAREM backend.
 * Handles user-related operations and role management.
 * 
 * Features:
 * - Retrieve user data and progress
 * - List all users (admin only)
 * - Change user roles (admin only)
 * 
 * User Data:
 * - Completed tasks and progress
 * - Role information
 * - Authentication status
 * 
 * Access Control:
 * - User data: Authenticated users can access their own data
 * - User listing and role changes: Admin only
 * 
 * Note: Consider adding:
 * - User profile updates
 * - Password reset functionality
 * - User deletion
 */

import { Response, Request } from 'express';
import { userCollection } from '../config/db';
import { ObjectId } from 'mongodb';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';


export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'User is not authenticated' });
    return;
  }
  const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });
  const userData = {
    completedTasks: user?.completedTasks || [],
    // ...
  }
  res.json(userData);
}

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