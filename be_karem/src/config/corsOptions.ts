/**
 * CORS (Cross-Origin Resource Sharing) configuration for the KAREM backend.
 * This configuration defines which origins, methods, and headers are allowed
 * when making requests to the API.
 * 
 * Current settings:
 * - Origin: Only allows requests from the frontend development server (localhost:5173)
 * - Methods: Only allows GET and POST requests
 * - Headers: Allows Content-Type and Authorization headers
 * 
 * Note: In production, the origin should be updated to match the production frontend URL.
 */

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default corsOptions;