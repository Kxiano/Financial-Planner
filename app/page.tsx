'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/app-shell/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useMoney } from '@/lib/hooks/useMoney';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

/** Bar heights for the preview's cash-flow chart: income and expenses, six months. */
const PREVIEW_BARS = [
  [62, 44],
  [62, 51],
  [70, 47],
  [66, 58],
  [78, 49],
  [84, 52],
];

/** A small, still picture of the dashboard, drawn with the app's own tokens. */
function ProductPreview() {
  const { t } = useLanguage();
  const { format } = useMoney();

  const rows = [
    { label: t('incomeMensal'), value: `+${format(4850)}`, positive: true },
    { label: t('gastosFixos'), value: `−${format(1890)}` },
    { label: t('gastosVariaveis'), value: `−${format(742.5)}` },
  ];

  return (
    <div role="img" aria-label={t('visaoGeral')} className="rounded-lg border bg-card p-6 shadow-2xl shadow-black/20 md:p-8">
      <p className="text-[13px] font-medium text-muted-foreground">{t('patrimonioTotal')}</p>
      <p className="num mt-2 text-4xl font-medium tracking-tight md:text-5xl">{format(48320)}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="num flex items-center gap-0.5 font-medium text-positive">
          <ArrowUpRight className="size-4" />
          +3.2%
        </span>
        {t('vsMesAnterior')}
      </p>

      <div className="mt-8 flex h-36 items-end gap-3 border-b md:gap-5">
        {PREVIEW_BARS.map(([income, expenses], index) => (
          <div key={index} className="flex h-full flex-1 items-end justify-center gap-0.5">
            <span className="w-1/3 rounded-t-sm bg-series-1" style={{ height: `${income}%` }} />
            <span className="w-1/3 rounded-t-sm bg-series-2" style={{ height: `${expenses}%` }} />
          </div>
        ))}
      </div>

      <dl className="mt-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b py-3 last:border-0 last:pb-0">
            <dt className="text-sm">{row.label}</dt>
            <dd className={`num font-medium ${row.positive ? 'text-positive' : ''}`}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** The first screen for a new visitor: what the app is, and the three ways in. */
export default function WelcomePage() {
  const router = useRouter();
  const { user, loading, login, continueAsGuest } = useAuth();
  const { t, isLoaded } = useLanguage();

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [loading, user, router]);

  if (loading || !isLoaded || user) return <div className="min-h-dvh" aria-busy="true" />;

  const signUp = () => {
    window.location.href = '/api/auth/login?screen_hint=signup';
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
          <Logo name={t('planejador')} />
          <Button variant="outline" onClick={login}>
            {t('loginToAccount')}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-12 px-4 py-12 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="animate-enter">
          <h1 className="max-w-[18ch] text-4xl leading-[1.08] tracking-[-0.035em] text-balance md:text-5xl lg:text-6xl">
            {t('heroTitulo')}
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed">{t('heroTexto')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={signUp}>
              {t('createAccountButton')}
            </Button>
            <Button size="lg" variant="outline" onClick={continueAsGuest}>
              {t('experimentarConvidado')}
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t('guestDataInfo')}</p>
        </div>

        <div className="animate-enter [animation-delay:120ms]">
          <ProductPreview />
        </div>
      </main>
    </div>
  );
}
