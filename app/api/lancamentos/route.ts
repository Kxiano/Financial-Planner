// app/api/lancamentos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all lancamentos for the current user
export async function GET(req: NextRequest) {
  try {
    // Check Auth0 session
    const authResponse = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    });

    let userId: string | null = null;

    if (authResponse.ok) {
      const user = await authResponse.json();
      
      // Find or create user in database
      const dbUser = await prisma.user.upsert({
        where: { auth0Id: user.sub },
        update: {
          email: user.email,
          name: user.name,
        },
        create: {
          auth0Id: user.sub,
          email: user.email,
          name: user.name,
          isGuest: false,
        },
      });
      
      userId = dbUser.id;
    }

    // If no authenticated user, return empty array (guest users use localStorage)
    if (!userId) {
      return NextResponse.json([]);
    }

    // Fetch lancamentos for this user
    const lancamentos = await prisma.lancamento.findMany({
      where: { userId },
      orderBy: { data: 'desc' },
    });

    return NextResponse.json(lancamentos);
  } catch (error) {
    console.error('Error fetching lancamentos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lancamentos' },
      { status: 500 }
    );
  }
}

// POST create new lancamento
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
    const { data, tipo, categoria, descricao, valor, currency, exchangeRate } = body;

    // Create lancamento
    const lancamento = await prisma.lancamento.create({
      data: {
        userId: dbUser.id,
        data,
        tipo,
        categoria,
        descricao,
        valor,
        currency: currency || 'BRL',
        exchangeRate,
      },
    });

    return NextResponse.json(lancamento, { status: 201 });
  } catch (error) {
    console.error('Error creating lancamento:', error);
    return NextResponse.json(
      { error: 'Failed to create lancamento' },
      { status: 500 }
    );
  }
}
