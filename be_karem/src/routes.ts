import { Router } from 'express';
import { runScript } from './controllers/scriptController';
import { authenticateToken } from './middlewares/authMiddleware';

const router = Router();

router.post('/run', authenticateToken(), runScript);

export default router;
