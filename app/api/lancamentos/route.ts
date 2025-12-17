import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getSession();
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      // If user doesn't exist in DB yet (first login without sync?), return empty
      return NextResponse.json([]); 
    }

    const lancamentos = await prisma.lancamento.findMany({
      where: { userId: user.id },
      orderBy: { data: 'desc' }
    });

    return NextResponse.json(lancamentos);
  } catch (error) {
    console.error('Error fetching lancamentos:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Ensure user exists
    let user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: session.user.sub,
          email: session.user.email,
          name: session.user.name,
          isGuest: false,
        }
      });
    }

    const lancamento = await prisma.lancamento.create({
      data: {
        userId: user.id,
        data: body.data,
        tipo: body.tipo,
        categoria: body.categoria,
        descricao: body.descricao,
        valor: parseFloat(body.valor),
        currency: body.currency,
        exchangeRate: body.exchangeRate,
      }
    });

    return NextResponse.json(lancamento);
  } catch (error) {
    console.error('Error creating lancamento:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
