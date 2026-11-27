import { CalculadoraParams, EvolucaoMensal } from '@/lib/types';

/**
 * The monthly contribution needed to reach `valorFuturo`, with interest
 * compounding monthly on both the starting amount and every contribution:
 *
 *   PMT = (FV - PV * (1 + r)^n) * r / ((1 + r)^n - 1)
 *
 * Returns 0 when the starting amount gets there on its own.
 */
export function calcularPMT({ valorInicial, valorFuturo, taxaAnual, anos }: CalculadoraParams): number {
  const r = taxaAnual / 12;
  const n = anos * 12;
  if (n <= 0) return 0;
  if (r === 0) return Math.max((valorFuturo - valorInicial) / n, 0);

  const crescimento = Math.pow(1 + r, n);
  return Math.max(((valorFuturo - valorInicial * crescimento) * r) / (crescimento - 1), 0);
}

/** Month-by-month projection: interest is earned first, then the contribution lands. */
export function gerarTabelaEvolucao(
  valorInicial: number,
  pmt: number,
  taxaMensal: number,
  numeroMeses: number,
): EvolucaoMensal[] {
  const tabela: EvolucaoMensal[] = [
    {
      mes: 0,
      investimentoMensal: 0,
      jurosMes: 0,
      totalInvestido: valorInicial,
      totalJuros: 0,
      totalAcumulado: valorInicial,
    },
  ];

  let totalInvestido = valorInicial;
  let totalJuros = 0;
  let totalAcumulado = valorInicial;

  for (let mes = 1; mes <= numeroMeses; mes++) {
    const jurosMes = totalAcumulado * taxaMensal;
    totalInvestido += pmt;
    totalJuros += jurosMes;
    totalAcumulado = totalInvestido + totalJuros;
    tabela.push({ mes, investimentoMensal: pmt, jurosMes, totalInvestido, totalJuros, totalAcumulado });
  }

  return tabela;
}

/** The monthly contribution and the projection it produces. */
export function calcularInvestimento(params: CalculadoraParams) {
  const pmt = calcularPMT(params);
  return {
    pmt,
    evolucao: gerarTabelaEvolucao(params.valorInicial, pmt, params.taxaAnual / 12, params.anos * 12),
  };
}
