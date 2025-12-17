import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership
    const lancamento = await prisma.lancamento.findUnique({
      where: { id: params.id }
    });

    if (!lancamento || lancamento.userId !== user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    await prisma.lancamento.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lancamento:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify ownership
    const existingLancamento = await prisma.lancamento.findUnique({
      where: { id: params.id }
    });

    if (!existingLancamento || existingLancamento.userId !== user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    const updatedLancamento = await prisma.lancamento.update({
      where: { id: params.id },
      data: {
        data: body.data,
        tipo: body.tipo,
        categoria: body.categoria,
        descricao: body.descricao,
        valor: parseFloat(body.valor),
        currency: body.currency,
        exchangeRate: body.exchangeRate,
      }
    });

    return NextResponse.json(updatedLancamento);
  } catch (error) {
    console.error('Error updating lancamento:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
