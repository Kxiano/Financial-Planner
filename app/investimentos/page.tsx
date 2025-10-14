// app/investimentos/page.tsx

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { calcularInvestimento } from '@/lib/calculators/investimentos';
import { EvolucaoMensal } from '@/lib/types';
import { Calculator, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InvestimentosPage() {
  const { t } = useLanguage();
  const [valorInicial, setValorInicial] = useState<string>('10000');
  const [valorFuturo, setValorFuturo] = useState<string>('1000000');
  const [taxaAnual, setTaxaAnual] = useState<string>('6');
  const [anos, setAnos] = useState<string>('20');
  
  const [resultado, setResultado] = useState<{
    pmt: number;
    evolucao: EvolucaoMensal[];
  } | null>(null);

  const handleCalcular = () => {
    const params = {
      valorInicial: parseFloat(valorInicial) || 0,
      valorFuturo: parseFloat(valorFuturo) || 0,
      taxaAnual: (parseFloat(taxaAnual) || 0) / 100,
      anos: parseInt(anos) || 0,
    };

    const result = calcularInvestimento(params);
    setResultado(result);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-4 md:pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t('calculadoraPrimeiroMilhao')}
        </h2>
        <Calculator className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Card de Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>{t('parametros')}</CardTitle>
            <CardDescription>
              {t('preenchaParaCalcular')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="valorInicial">{t('valorInicial')}</Label>
              <Input
                id="valorInicial"
                type="number"
                value={valorInicial}
                onChange={(e) => setValorInicial(e.target.value)}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorFuturo">{t('valorFuturoDesejado')}</Label>
              <Input
                id="valorFuturo"
                type="number"
                value={valorFuturo}
                onChange={(e) => setValorFuturo(e.target.value)}
                placeholder="1000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxaAnual">{t('taxaJurosAnual')}</Label>
              <Input
                id="taxaAnual"
                type="number"
                step="0.1"
                value={taxaAnual}
                onChange={(e) => setTaxaAnual(e.target.value)}
                placeholder="6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anos">{t('periodoAnos')}</Label>
              <Input
                id="anos"
                type="number"
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
                placeholder="20"
              />
            </div>

            <Button onClick={handleCalcular} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              {t('calcular')}
            </Button>
          </CardContent>
        </Card>

        {/* Card de Resultado */}
        <Card>
          <CardHeader>
            <CardTitle>{t('resultado')}</CardTitle>
            <CardDescription>
              {t('valorInvestirMensalmente')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resultado ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t('investimentoMensal')}
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(resultado.pmt)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t('totalInvestido')}
                    </p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(
                        resultado.evolucao[resultado.evolucao.length - 1]
                          .totalInvestido
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t('totalJuros')}
                    </p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(
                        resultado.evolucao[resultado.evolucao.length - 1]
                          .totalJuros
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    💡 {t('investindo')} <strong>{formatCurrency(resultado.pmt)}</strong> {t('porMesDurante')}{' '}
                    <strong>{anos} {t('anos')}</strong>, {t('voceAlcancara')}{' '}
                    <strong>
                      {formatCurrency(
                        resultado.evolucao[resultado.evolucao.length - 1]
                          .totalAcumulado
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>{t('preenchaCliqueCalcular')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

            {/* Tabela de Evolução com Tabs */}
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle>{t('evolucaoInvestimento')}</CardTitle>
            <CardDescription>
              {t('projecaoMesAMes')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="anual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="anual">{t('evolucaoAnual')}</TabsTrigger>
                <TabsTrigger value="mensal">{t('evolucaoMensal')}</TabsTrigger>
              </TabsList>
              
              {/* Tab Anual */}
              <TabsContent value="anual">
                <div className="max-h-[500px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('mes')}</TableHead>
                        <TableHead>{t('investimentoMensal')}</TableHead>
                        <TableHead>{t('jurosMes')}</TableHead>
                        <TableHead>{t('totalInvestido')}</TableHead>
                        <TableHead>{t('totalJuros')}</TableHead>
                        <TableHead className="text-right">{t('totalAcumulado')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resultado.evolucao
                        .filter((item, index) => {
                          return (
                            index === 0 ||
                            index % 12 === 0 ||
                            index === resultado.evolucao.length - 1
                          );
                        })
                        .map((item) => (
                          <TableRow key={item.mes}>
                            <TableCell className="font-medium">{item.mes}</TableCell>
                            <TableCell>{formatCurrency(item.investimentoMensal)}</TableCell>
                            <TableCell>{formatCurrency(item.jurosMes)}</TableCell>
                            <TableCell>{formatCurrency(item.totalInvestido)}</TableCell>
                            <TableCell className="text-green-600">
                              {formatCurrency(item.totalJuros)}
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              {formatCurrency(item.totalAcumulado)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Tab Mensal */}
              <TabsContent value="mensal">
                <div className="max-h-[500px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('mes')}</TableHead>
                        <TableHead>{t('investimentoMensal')}</TableHead>
                        <TableHead>{t('jurosMes')}</TableHead>
                        <TableHead>{t('totalInvestido')}</TableHead>
                        <TableHead>{t('totalJuros')}</TableHead>
                        <TableHead className="text-right">{t('totalAcumulado')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resultado.evolucao.map((item) => (
                        <TableRow key={item.mes}>
                          <TableCell className="font-medium">{item.mes}</TableCell>
                          <TableCell>{formatCurrency(item.investimentoMensal)}</TableCell>
                          <TableCell>{formatCurrency(item.jurosMes)}</TableCell>
                          <TableCell>{formatCurrency(item.totalInvestido)}</TableCell>
                          <TableCell className="text-green-600">
                            {formatCurrency(item.totalJuros)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatCurrency(item.totalAcumulado)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}