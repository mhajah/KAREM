import { Response } from 'express';
import { userCollection } from '../config/db';
import { ObjectId } from 'mongodb';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';


export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'User is not authenticated' });
    return;
}
const user = await userCollection.findOne({ _id: new ObjectId(req.user.id) });
res.json(user);
}