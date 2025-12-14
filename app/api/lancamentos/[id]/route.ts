// app/api/lancamentos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT update lancamento
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

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
    
    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership
    const existing = await prisma.lancamento.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const body = await req.json();
    const { data, tipo, categoria, descricao, valor, currency, exchangeRate } = body;

    // Update lancamento
    const lancamento = await prisma.lancamento.update({
      where: { id },
      data: {
        data,
        tipo,
        categoria,
        descricao,
        valor,
        currency,
        exchangeRate,
      },
    });

    return NextResponse.json(lancamento);
  } catch (error) {
    console.error('Error updating lancamento:', error);
    return NextResponse.json(
      { error: 'Failed to update lancamento' },
      { status: 500 }
    );
  }
}

// DELETE lancamento
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

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
    
    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: user.sub },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership
    const existing = await prisma.lancamento.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== dbUser.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Delete lancamento
    await prisma.lancamento.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lancamento:', error);
    return NextResponse.json(
      { error: 'Failed to delete lancamento' },
      { status: 500 }
    );
  }
}
