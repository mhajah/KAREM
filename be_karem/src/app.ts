/**
 * Main application file for the KAREM backend service.
 * This file sets up the Express application with all necessary middleware and routes.
 * 
 * Key components:
 * - Express server configuration with CORS and JSON parsing
 * - Authentication routes (login, register, token verification)
 * - User management routes (get user data, change roles)
 * - Task management routes (CRUD operations for tasks)
 * - Class management routes (add and get classes)
 * 
 * All routes are protected with authentication middleware where appropriate,
 * with role-based access control for admin and teacher specific operations.
 */

import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import { Router } from 'express';
import { runScript } from './controllers/scriptController';
import { authenticateToken } from './middlewares/authMiddleware';
import { login, register, verifyToken } from './controllers/authController';
import { changeRole, getUserData, getUsers } from './controllers/userController';
import { addTask, deleteTaskById, editTaskById, getTaskById, getTasks } from './controllers/taskController';
import { addClass, getClasses } from './controllers/classController';

const app = express();
const router = Router();

// ROUTES 
router.post('/run', runScript);
router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', authenticateToken(), verifyToken);
router.post('/get-user-data', authenticateToken(), getUserData);
router.post('/get-all-users-data', authenticateToken(['admin']), getUsers);
router.post('/change-role', authenticateToken(['admin']), changeRole);
router.post('/add-task', authenticateToken(['admin', 'teacher']), addTask);
router.post('/get-all-tasks', authenticateToken(), getTasks);
router.post('/get-task-by-id', getTaskById);
router.post('/edit-task-by-id', authenticateToken(['admin', 'teacher']), editTaskById);
router.post('/delete-task-by-id', authenticateToken(['admin', 'teacher']), deleteTaskById);

router.post('/add-class', authenticateToken(['admin']), addClass);
router.post('/get-all-classes', authenticateToken(['admin', 'teacher']), getClasses);

// APP
app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);

export default app;