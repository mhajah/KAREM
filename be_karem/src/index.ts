/**
 * Server entry point for the KAREM backend service.
 * This file initializes and starts the Express server on the specified port.
 * 
 * Configuration:
 * - Port: 5175
 * - Environment: Development/Production (based on NODE_ENV)
 * 
 * The server is configured to listen on all network interfaces
 * and logs the server URL upon successful startup.
 */

import app from './app';

const PORT = 5175;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});