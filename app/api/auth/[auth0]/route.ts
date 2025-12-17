import { handleAuth } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

const authHandler = handleAuth();

export const GET = handleAuth();
export const POST = handleAuth();
