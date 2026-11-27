import { handleAuth } from '@auth0/nextjs-auth0';

// Auth0 serves /api/auth/login, /logout, /callback and /me from this one handler.
const handler = handleAuth();

export const GET = handler;
export const POST = handler;
