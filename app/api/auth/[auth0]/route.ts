import { handleAuth } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

const authHandler = handleAuth();

export const GET = async (req: NextRequest, props: { params: Promise<{ auth0: string }> }) => {
  const params = await props.params;
  return authHandler(req, { params: params as any });
};

export const POST = async (req: NextRequest, props: { params: Promise<{ auth0: string }> }) => {
  const params = await props.params;
  return authHandler(req, { params: params as any });
};
