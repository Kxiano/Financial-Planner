// app/api/users/sync/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST sync guest data to authenticated user
export async function POST(req: NextRequest) {
  try {
    // Check Auth0 session
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });

    if (!authResponse.ok) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await authResponse.json();
    
    // Find or create user in database
    const dbUser = await prisma.user.upsert({
      where: { auth0Id: user.sub },
      update: {},
      create: {
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        isGuest: false,
      },
    });

    const body = await req.json();
    const { lancamentos } = body;

    if (!Array.isArray(lancamentos)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Create all lancamentos for this user
    const created = await prisma.lancamento.createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: lancamentos.map((l: any) => ({
        userId: dbUser.id,
        data: l.data,
        tipo: l.tipo,
        categoria: l.categoria,
        descricao: l.descricao,
        valor: l.valor,
        currency: l.currency || 'BRL',
        exchangeRate: l.exchangeRate,
      })),
    });

    return NextResponse.json({
      success: true,
      count: created.count,
    });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    );
  }
}
