import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import { Router } from 'express';
import { runScript } from './controllers/scriptController';
import { authenticateToken } from './middlewares/authMiddleware';
import { login, register, verifyToken } from './controllers/authController';
import { changeRole, getUsers } from './controllers/adminController';
import { getUserData } from './controllers/userController';

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

// APP
app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router);

export default app;