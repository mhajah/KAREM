import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const SECRET_KEY = 'secret_key';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = (requiredRoles: string[] = []) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Token is missing' });
            return;
        }

        jwt.verify(token, SECRET_KEY, (err, user: any) => {
            if (err) {
                res.status(403).json({ error: 'Invalid token' });
                return;
            }
          
            req.user = user;

            if (requiredRoles.length > 0 && user?.role && !requiredRoles.includes(user.role)) {
                res.status(403).json({ error: 'Access denied: insufficient role' });
                return;
            }

            next();
        });
    };
};
