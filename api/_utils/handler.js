// Utility: Standard Response & CORS Handler
// Handles CORS preflight, method validation, and consistent error responses

const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.VITE_APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

export const handleRequest = (handler) => async (req, res) => {
    const origin = req.headers.origin;
    const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);
    const isDevelopment = process.env.NODE_ENV === 'development';

    // 1. CORS Management
    // Only allow specific origins. If no origin (server-server), allow default or restrict.
    if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        // Allow requests with no origin (e.g. mobile apps, curl)
        // Or strict block: res.setHeader('Access-Control-Allow-Origin', 'null');
        res.setHeader('Access-Control-Allow-Origin', '*');
    } else {
        // Origin present but not allowed -> Block by not sending matching header
        // effectively causing CORS error in browser
        res.setHeader('Access-Control-Allow-Origin', 'null');
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Handle Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Strict Method Validation (Only POST)
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    // 4. Origin Blocking (Server-side Enforcement)
    // Even if CORS fails in browser, server receives request. We optionally block here.
    if (origin && !isAllowedOrigin && !isDevelopment) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Origin not allowed'
        });
    }

    try {
        await handler(req, res);
    } catch (error) {
        console.error('❌ API Error:', error);

        // 5. Error Masking
        const statusCode = error.statusCode || 500;
        const message = process.env.NODE_ENV === 'production' && statusCode === 500
            ? 'Internal server error'
            : error.message;

        return res.status(statusCode).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
