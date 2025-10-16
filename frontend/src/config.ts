// API Configuration - Auto-detect production vs development
const isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_URL = import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:3001' : 'https://mgnrega-backend.onrender.com');
