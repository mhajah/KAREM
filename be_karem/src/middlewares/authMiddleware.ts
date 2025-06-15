/**
 * Authentication Middleware for the KAREM backend.
 * Handles JWT token verification and role-based access control.
 * 
 * Features:
 * - JWT token validation
 * - Role-based access control
 * - Request authentication
 * 
 * Security:
 * - Verifies token presence and validity
 * - Checks user roles against required roles
 * - Extends Express Request type with user information
 * 
 * Usage:
 * - Basic auth: authenticateToken()
 * - Role-based: authenticateToken(['admin', 'teacher'])
 * 
 * Note: SECRET_KEY should be moved to environment variables
 * and consider implementing token refresh mechanism
 */

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
