import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Lancamento } from '@/lib/types';

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const localLancamentos: Lancamento[] = body.lancamentos || [];

    // UPSERT User
    const user = await prisma.user.upsert({
      where: { auth0Id: session.user.sub },
      update: {
        email: session.user.email,
        name: session.user.name,
      },
      create: {
        auth0Id: session.user.sub,
        email: session.user.email,
        name: session.user.name,
        isGuest: false,
      }
    });

    // Bulk create transactions
    // Note: We ignore the local ID and create new ones in Mongo to ensure uniqueness and format.
    if (localLancamentos.length > 0) {
      await prisma.lancamento.createMany({
        data: localLancamentos.map(l => ({
          userId: user.id,
          data: l.data,
          tipo: l.tipo,
          categoria: l.categoria,
          descricao: l.descricao,
          valor: typeof l.valor === 'string' ? parseFloat(l.valor) : l.valor,
          currency: l.currency || 'BRL',
          exchangeRate: l.exchangeRate,
        }))
      });
    }

    return NextResponse.json({ success: true, count: localLancamentos.length });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
