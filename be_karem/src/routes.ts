/**
 * Routes configuration file for the KAREM backend service.
 * This file defines the API endpoints for script execution functionality.
 * 
 * Current routes:
 * - POST /run: Executes a script with authentication required
 * 
 * Note: This file appears to be a separate routes configuration,
 * though most routes are currently defined in app.ts.
 * Consider consolidating all routes in one location for better maintainability.
 */

import { Router } from 'express';
import { runScript } from './controllers/scriptController';
import { authenticateToken } from './middlewares/authMiddleware';

const router = Router();

router.post('/run', authenticateToken(), runScript);

export default router;
