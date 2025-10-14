// lib/i18n/translations.ts

export type Language = 'pt-BR' | 'en-GB' | 'hu' | 'it' | 'de';

export const languages = [
  { code: 'pt-BR' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en-GB' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'hu' as Language, name: 'Magyar', flag: '🇭🇺' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
];

// Mapeamento de códigos de idioma para locales
export const languageToLocale: Record<Language, string> = {
  'pt-BR': 'pt-BR',
  'en-GB': 'en-GB',
  'hu': 'hu-HU',
  'it': 'it-IT',
  'de': 'de-DE',
};


type TranslationKeys = {
  // Sidebar
  planejador: string;
  investimentos: string;
  navegacao: string;
  dashboard: string;
  calculadora: string;
  lancamentos: string;
  relatorios: string;
  versao: string;
  
  // Dashboard - Cards
  patrimonioTotal: string;
  sobraMensal: string;
  fundoEmergencia: string;
  dividas: string;
  incomeMensal: string;
  rendimentos: string;
  gastosFixos: string;
  gastosVariaveis: string;
  mesesCobertura: string;
  vsMesAnterior: string;
  
  // Dashboard - Gráficos
  incomeVsGastos: string;
  investimentosVsRendimentos: string;
  evolucaoDosUltimos: string;
  performanceDosUltimos: string;
  meses: string;
  income: string;
  gastos: string;
  
  // Mensagens gerais
  carregando: string;
  nenhumDadoDisponivel: string;
  comecaAdicionandoLancamentos: string;
  
  // Lançamentos
  novoLancamento: string;
  historicoLancamentos: string;
  todosRegistrosFinanceiros: string;
  adicionarLancamento: string;
  registreEntradaSaida: string;
  mesAno: string;
  tipo: string;
  categoria: string;
  descricao: string;
  valor: string;
  acoes: string;
  data: string;
  entrada: string;
  saida: string;
  cancelar: string;
  adicionar: string;
  nenhumLancamentoRegistrado: string;
  cliqueNovoLancamento: string;
  temCertezaExcluir: string;
  
  // Categorias
  receitaSalario: string;
  retornoInvestimento: string;
  gastoFixo: string;
  gastoVariavel: string;
  investimento: string;
  fundoEmergenciaCategoria: string;
  pagamentoDivida: string;
  
  // Relatórios
  periodo: string;
  selecionePeriodo: string;
  todos: string;
  mesAtual: string;
  mesPassado: string;
  ultimos3Meses: string;
  ultimos6Meses: string;
  esteAno: string;
  mesEspecifico: string;
  selecioneMes: string;
  exportarCSV: string;
  totalEntradas: string;
  totalSaidas: string;
  saldo: string;
  lancamentosText: string;
  todosLancamentos: string;
  diferencaEntradasSaidas: string;
  nenhumLancamentoPeriodo: string;
  
  // Calculadora
  calculadoraPrimeiroMilhao: string;
  parametros: string;
  preenchaParaCalcular: string;
  valorInicial: string;
  valorFuturoDesejado: string;
  taxaJurosAnual: string;
  periodoAnos: string;
  calcular: string;
  resultado: string;
  valorInvestirMensalmente: string;
  investimentoMensal: string;
  totalInvestido: string;
  totalJuros: string;
  evolucaoInvestimento: string;
  projecaoMesAMes: string;
  mes: string;
  jurosMes: string;
  totalAcumulado: string;
  preenchaCliqueCalcular: string;
  investindo: string;
  porMesDurante: string;
  anos: string;
  voceAlcancara: string;
  evolucaoAnual: string;
  evolucaoMensal: string;
};

export const translations: Record<Language, TranslationKeys> = {
  'pt-BR': {
    // Sidebar
    planejador: 'Planejador',
    investimentos: 'Investimentos',
    navegacao: 'Navegação',
    dashboard: 'Dashboard',
    calculadora: 'Calculadora',
    lancamentos: 'Lançamentos',
    relatorios: 'Relatórios',
    versao: 'Versão',
    
    // Dashboard
    patrimonioTotal: 'Patrimônio Total',
    sobraMensal: 'Sobra Mensal',
    fundoEmergencia: 'Fundo de Emergência',
    dividas: 'Dívidas',
    incomeMensal: 'Income Mensal',
    rendimentos: 'Rendimentos',
    gastosFixos: 'Gastos Fixos',
    gastosVariaveis: 'Gastos Variáveis',
    mesesCobertura: 'meses de cobertura',
    vsMesAnterior: 'vs mês anterior',
    incomeVsGastos: 'Income vs Gastos',
    investimentosVsRendimentos: 'Investimentos vs Rendimentos',
    evolucaoDosUltimos: 'Evolução dos últimos',
    performanceDosUltimos: 'Performance dos últimos',
    meses: 'meses',
    income: 'Income',
    gastos: 'Gastos',
    carregando: 'Carregando...',
    nenhumDadoDisponivel: 'Nenhum dado disponível',
    comecaAdicionandoLancamentos: 'Comece adicionando lançamentos na página de Lançamentos para ver suas métricas aqui.',
    
    // Lançamentos
    novoLancamento: 'Novo Lançamento',
    historicoLancamentos: 'Histórico de Lançamentos',
    todosRegistrosFinanceiros: 'Todos os seus registros financeiros',
    adicionarLancamento: 'Adicionar Lançamento',
    registreEntradaSaida: 'Registre uma entrada ou saída financeira',
    mesAno: 'Mês/Ano',
    tipo: 'Tipo',
    categoria: 'Categoria',
    descricao: 'Descrição',
    valor: 'Valor (R$)',
    acoes: 'Ações',
    data: 'Data',
    entrada: 'Entrada',
    saida: 'Saída',
    cancelar: 'Cancelar',
    adicionar: 'Adicionar',
    nenhumLancamentoRegistrado: 'Nenhum lançamento registrado ainda.',
    cliqueNovoLancamento: 'Clique em "Novo Lançamento" para começar.',
    temCertezaExcluir: 'Tem certeza que deseja excluir este lançamento?',
    
    // Categorias
    receitaSalario: 'Receita/Salário',
    retornoInvestimento: 'Retorno de Investimento',
    gastoFixo: 'Gasto Fixo',
    gastoVariavel: 'Gasto Variável',
    investimento: 'Investimento',
    fundoEmergenciaCategoria: 'Fundo de Emergência',
    pagamentoDivida: 'Pagamento de Dívida',
    
    // Relatórios
    periodo: 'Período',
    selecionePeriodo: 'Selecione o período para visualização',
    todos: 'Todos',
    mesAtual: 'Mês Atual',
    mesPassado: 'Mês Passado',
    ultimos3Meses: 'Últimos 3 Meses',
    ultimos6Meses: 'Últimos 6 Meses',
    esteAno: 'Este Ano',
    mesEspecifico: 'Mês Específico',
    selecioneMes: 'Selecione o mês desejado:',
    exportarCSV: 'Exportar CSV',
    totalEntradas: 'Total Entradas',
    totalSaidas: 'Total Saídas',
    saldo: 'Saldo',
    lancamentosText: 'lançamentos',
    todosLancamentos: 'Todos os Lançamentos',
    diferencaEntradasSaidas: 'Diferença entre entradas e saídas',
    nenhumLancamentoPeriodo: 'Nenhum lançamento encontrado para o período selecionado.',
    
    // Calculadora
    calculadoraPrimeiroMilhao: 'Calculadora do Primeiro Milhão',
    parametros: 'Parâmetros',
    preenchaParaCalcular: 'Preencha os valores para calcular seu investimento mensal',
    valorInicial: 'Valor Inicial (R$)',
    valorFuturoDesejado: 'Valor Futuro Desejado (R$)',
    taxaJurosAnual: 'Taxa de Juros Anual (%)',
    periodoAnos: 'Período (anos)',
    calcular: 'Calcular',
    resultado: 'Resultado',
    valorInvestirMensalmente: 'Valor que você precisa investir mensalmente',
    investimentoMensal: 'Investimento Mensal',
    totalInvestido: 'Total Investido',
    totalJuros: 'Total de Juros',
    evolucaoInvestimento: 'Evolução do Investimento',
    projecaoMesAMes: 'Projeção mês a mês do crescimento do seu patrimônio',
    mes: 'Mês',
    jurosMes: 'Juros do Mês',
    totalAcumulado: 'Total Acumulado',
    preenchaCliqueCalcular: 'Preencha os campos e clique em Calcular',
    investindo: 'Investindo',
    porMesDurante: 'por mês durante',
    anos: 'anos',
    voceAlcancara: 'você alcançará',
    evolucaoAnual: 'Evolução Anual do Investimento',
    evolucaoMensal: 'Evolução Mensal do Investimento',
  },
  
  'en-GB': {
    // Sidebar
    planejador: 'Planner',
    investimentos: 'Investments',
    navegacao: 'Navigation',
    dashboard: 'Dashboard',
    calculadora: 'Calculator',
    lancamentos: 'Transactions',
    relatorios: 'Reports',
    versao: 'Version',
    
    // Dashboard
    patrimonioTotal: 'Total Assets',
    sobraMensal: 'Monthly Surplus',
    fundoEmergencia: 'Emergency Fund',
    dividas: 'Debts',
    incomeMensal: 'Monthly Income',
    rendimentos: 'Returns',
    gastosFixos: 'Fixed Expenses',
    gastosVariaveis: 'Variable Expenses',
    mesesCobertura: 'months coverage',
    vsMesAnterior: 'vs previous month',
    incomeVsGastos: 'Income vs Expenses',
    investimentosVsRendimentos: 'Investments vs Returns',
    evolucaoDosUltimos: 'Evolution of the last',
    performanceDosUltimos: 'Performance of the last',
    meses: 'months',
    income: 'Income',
    gastos: 'Expenses',
    carregando: 'Loading...',
    nenhumDadoDisponivel: 'No data available',
    comecaAdicionandoLancamentos: 'Start by adding transactions on the Transactions page to see your metrics here.',
    
    // Lançamentos
    novoLancamento: 'New Transaction',
    historicoLancamentos: 'Transaction History',
    todosRegistrosFinanceiros: 'All your financial records',
    adicionarLancamento: 'Add Transaction',
    registreEntradaSaida: 'Register an income or expense',
    mesAno: 'Month/Year',
    tipo: 'Type',
    categoria: 'Category',
    descricao: 'Description',
    valor: 'Amount',
    acoes: 'Actions',
    data: 'Date',
    entrada: 'Income',
    saida: 'Expense',
    cancelar: 'Cancel',
    adicionar: 'Add',
    nenhumLancamentoRegistrado: 'No transactions registered yet.',
    cliqueNovoLancamento: 'Click "New Transaction" to get started.',
    temCertezaExcluir: 'Are you sure you want to delete this transaction?',
    
    // Categorias
    receitaSalario: 'Income/Salary',
    retornoInvestimento: 'Investment Return',
    gastoFixo: 'Fixed Expense',
    gastoVariavel: 'Variable Expense',
    investimento: 'Investment',
    fundoEmergenciaCategoria: 'Emergency Fund',
    pagamentoDivida: 'Debt Payment',
    
    // Relatórios
    periodo: 'Period',
    selecionePeriodo: 'Select the period for viewing',
    todos: 'All',
    mesAtual: 'Current Month',
    mesPassado: 'Last Month',
    ultimos3Meses: 'Last 3 Months',
    ultimos6Meses: 'Last 6 Months',
    esteAno: 'This Year',
    mesEspecifico: 'Specific Month',
    selecioneMes: 'Select the desired month:',
    exportarCSV: 'Export CSV',
    totalEntradas: 'Total Income',
    totalSaidas: 'Total Expenses',
    saldo: 'Balance',
    lancamentosText: 'transactions',
    todosLancamentos: 'All Transactions',
    diferencaEntradasSaidas: 'Difference between income and expenses',
    nenhumLancamentoPeriodo: 'No transactions found for the selected period.',
    
    // Calculadora
    calculadoraPrimeiroMilhao: 'First Million Calculator',
    parametros: 'Parameters',
    preenchaParaCalcular: 'Fill in the values to calculate your monthly investment',
    valorInicial: 'Initial Amount',
    valorFuturoDesejado: 'Desired Future Value',
    taxaJurosAnual: 'Annual Interest Rate (%)',
    periodoAnos: 'Period (years)',
    calcular: 'Calculate',
    resultado: 'Result',
    valorInvestirMensalmente: 'Amount you need to invest monthly',
    investimentoMensal: 'Monthly Investment',
    totalInvestido: 'Total Invested',
    totalJuros: 'Total Interest',
    evolucaoInvestimento: 'Investment Evolution',
    projecaoMesAMes: 'Month-by-month projection of your wealth growth',
    mes: 'Month',
    jurosMes: 'Monthly Interest',
    totalAcumulado: 'Total Accumulated',
    preenchaCliqueCalcular: 'Fill in the fields and click Calculate',
    investindo: 'Investing',
    porMesDurante: 'per month for',
    anos: 'years',
    voceAlcancara: 'you will reach',
    evolucaoAnual: 'Annual Investment Evolution',
    evolucaoMensal: 'Monthly Investment Evolution',
  },
  
  'hu': {
    planejador: 'Tervező',
    investimentos: 'Befektetések',
    navegacao: 'Navigáció',
    dashboard: 'Irányítópult',
    calculadora: 'Számológép',
    lancamentos: 'Tranzakciók',
    relatorios: 'Jelentések',
    versao: 'Verzió',
    patrimonioTotal: 'Teljes Vagyon',
    sobraMensal: 'Havi Többlet',
    fundoEmergencia: 'Vészhelyzeti Alap',
    dividas: 'Adósságok',
    incomeMensal: 'Havi Jövedelem',
    rendimentos: 'Hozamok',
    gastosFixos: 'Fix Kiadások',
    gastosVariaveis: 'Változó Kiadások',
    mesesCobertura: 'hónap fedezet',
    vsMesAnterior: 'vs előző hónap',
    incomeVsGastos: 'Jövedelem vs Kiadások',
    investimentosVsRendimentos: 'Befektetések vs Hozamok',
    evolucaoDosUltimos: 'Az elmúlt fejlődése',
    performanceDosUltimos: 'Az elmúlt teljesítménye',
    meses: 'hónap',
    income: 'Jövedelem',
    gastos: 'Kiadások',
    carregando: 'Betöltés...',
    nenhumDadoDisponivel: 'Nincs elérhető adat',
    comecaAdicionandoLancamentos: 'Kezdje tranzakciók hozzáadásával a Tranzakciók oldalon a metrikák megtekintéséhez.',
    novoLancamento: 'Új Tranzakció',
    historicoLancamentos: 'Tranzakciós Előzmények',
    todosRegistrosFinanceiros: 'Összes pénzügyi rekord',
    adicionarLancamento: 'Tranzakció Hozzáadása',
    registreEntradaSaida: 'Jövedelem vagy kiadás regisztrálása',
    mesAno: 'Hónap/Év',
    tipo: 'Típus',
    categoria: 'Kategória',
    descricao: 'Leírás',
    valor: 'Összeg',
    acoes: 'Műveletek',
    data: 'Dátum',
    entrada: 'Jövedelem',
    saida: 'Kiadás',
    cancelar: 'Mégse',
    adicionar: 'Hozzáadás',
    nenhumLancamentoRegistrado: 'Még nincsenek regisztrált tranzakciók.',
    cliqueNovoLancamento: 'Kattintson az "Új Tranzakció" gombra a kezdéshez.',
    temCertezaExcluir: 'Biztosan törölni szeretné ezt a tranzakciót?',
    receitaSalario: 'Jövedelem/Fizetés',
    retornoInvestimento: 'Befektetési Hozam',
    gastoFixo: 'Fix Kiadás',
    gastoVariavel: 'Változó Kiadás',
    investimento: 'Befektetés',
    fundoEmergenciaCategoria: 'Vészhelyzeti Alap',
    pagamentoDivida: 'Adósság Törlesztés',
    periodo: 'Időszak',
    selecionePeriodo: 'Válassza ki a megtekintési időszakot',
    todos: 'Összes',
    mesAtual: 'Aktuális Hónap',
    mesPassado: 'Előző Hónap',
    ultimos3Meses: 'Utolsó 3 Hónap',
    ultimos6Meses: 'Utolsó 6 Hónap',
    esteAno: 'Ez az Év',
    mesEspecifico: 'Meghatározott Hónap',
    selecioneMes: 'Válassza ki a kívánt hónapot:',
    exportarCSV: 'CSV Exportálás',
    totalEntradas: 'Összes Jövedelem',
    totalSaidas: 'Összes Kiadás',
    saldo: 'Egyenleg',
    lancamentosText: 'tranzakció',
    todosLancamentos: 'Összes Tranzakció',
    diferencaEntradasSaidas: 'Jövedelem és kiadások közötti különbség',
    nenhumLancamentoPeriodo: 'Nem találhatók tranzakciók a kiválasztott időszakban.',
    calculadoraPrimeiroMilhao: 'Első Millió Számológép',
    parametros: 'Paraméterek',
    preenchaParaCalcular: 'Töltse ki az értékeket a havi befektetés kiszámításához',
    valorInicial: 'Kezdő Összeg',
    valorFuturoDesejado: 'Kívánt Jövőbeli Érték',
    taxaJurosAnual: 'Éves Kamatláb (%)',
    periodoAnos: 'Időszak (év)',
    calcular: 'Számítás',
    resultado: 'Eredmény',
    valorInvestirMensalmente: 'Havonta befektetendő összeg',
    investimentoMensal: 'Havi Befektetés',
    totalInvestido: 'Összes Befektetett',
    totalJuros: 'Összes Kamat',
    evolucaoInvestimento: 'Befektetés Fejlődése',
    projecaoMesAMes: 'Hónapról hónapra előrejelzés',
    mes: 'Hónap',
    jurosMes: 'Havi Kamat',
    totalAcumulado: 'Összes Felhalmozott',
    preenchaCliqueCalcular: 'Töltse ki a mezőket és kattintson a Számítás gombra',
    investindo: 'Befektetve',
    porMesDurante: 'havonta',
    anos: 'év',
    voceAlcancara: 'el fogja érni',
    evolucaoAnual: 'Éves Befektetés Fejlődés',
    evolucaoMensal: 'Havi Befektetés Fejlődés',
  },
  
  'it': {
    planejador: 'Pianificatore',
    investimentos: 'Investimenti',
    navegacao: 'Navigazione',
    dashboard: 'Dashboard',
    calculadora: 'Calcolatore',
    lancamentos: 'Transazioni',
    relatorios: 'Rapporti',
    versao: 'Versione',
    patrimonioTotal: 'Patrimonio Totale',
    sobraMensal: 'Surplus Mensile',
    fundoEmergencia: 'Fondo di Emergenza',
    dividas: 'Debiti',
    incomeMensal: 'Reddito Mensile',
    rendimentos: 'Rendimenti',
    gastosFixos: 'Spese Fisse',
    gastosVariaveis: 'Spese Variabili',
    mesesCobertura: 'mesi di copertura',
    vsMesAnterior: 'vs mese precedente',
    incomeVsGastos: 'Reddito vs Spese',
    investimentosVsRendimentos: 'Investimenti vs Rendimenti',
    evolucaoDosUltimos: 'Evoluzione degli ultimi',
    performanceDosUltimos: 'Performance degli ultimi',
    meses: 'mesi',
    income: 'Reddito',
    gastos: 'Spese',
    carregando: 'Caricamento...',
    nenhumDadoDisponivel: 'Nessun dato disponibile',
    comecaAdicionandoLancamentos: 'Inizia aggiungendo transazioni nella pagina Transazioni per vedere le tue metriche qui.',
    novoLancamento: 'Nuova Transazione',
    historicoLancamentos: 'Storico Transazioni',
    todosRegistrosFinanceiros: 'Tutti i tuoi registri finanziari',
    adicionarLancamento: 'Aggiungi Transazione',
    registreEntradaSaida: 'Registra un entrata o una spesa',
    mesAno: 'Mese/Anno',
    tipo: 'Tipo',
    categoria: 'Categoria',
    descricao: 'Descrizione',
    valor: 'Importo',
    acoes: 'Azioni',
    data: 'Data',
    entrada: 'Entrata',
    saida: 'Uscita',
    cancelar: 'Annulla',
    adicionar: 'Aggiungi',
    nenhumLancamentoRegistrado: 'Nessuna transazione registrata ancora.',
    cliqueNovoLancamento: 'Clicca "Nuova Transazione" per iniziare.',
    temCertezaExcluir: 'Sei sicuro di voler eliminare questa transazione?',
    receitaSalario: 'Reddito/Stipendio',
    retornoInvestimento: 'Rendimento Investimento',
    gastoFixo: 'Spesa Fissa',
    gastoVariavel: 'Spesa Variabile',
    investimento: 'Investimento',
    fundoEmergenciaCategoria: 'Fondo di Emergenza',
    pagamentoDivida: 'Pagamento Debito',
    periodo: 'Periodo',
    selecionePeriodo: 'Seleziona il periodo di visualizzazione',
    todos: 'Tutti',
    mesAtual: 'Mese Corrente',
    mesPassado: 'Mese Scorso',
    ultimos3Meses: 'Ultimi 3 Mesi',
    ultimos6Meses: 'Ultimi 6 Mesi',
    esteAno: 'Quest\'Anno',
    mesEspecifico: 'Mese Specifico',
    selecioneMes: 'Seleziona il mese desiderato:',
    exportarCSV: 'Esporta CSV',
    totalEntradas: 'Totale Entrate',
    totalSaidas: 'Totale Uscite',
    saldo: 'Saldo',
    lancamentosText: 'transazioni',
    todosLancamentos: 'Tutte le Transazioni',
    diferencaEntradasSaidas: 'Differenza tra entrate e uscite',
    nenhumLancamentoPeriodo: 'Nessuna transazione trovata per il periodo selezionato.',
    calculadoraPrimeiroMilhao: 'Calcolatore Primo Milione',
    parametros: 'Parametri',
    preenchaParaCalcular: 'Compila i valori per calcolare il tuo investimento mensile',
    valorInicial: 'Importo Iniziale',
    valorFuturoDesejado: 'Valore Futuro Desiderato',
    taxaJurosAnual: 'Tasso di Interesse Annuale (%)',
    periodoAnos: 'Periodo (anni)',
    calcular: 'Calcola',
    resultado: 'Risultato',
    valorInvestirMensalmente: 'Importo da investire mensilmente',
    investimentoMensal: 'Investimento Mensile',
    totalInvestido: 'Totale Investito',
    totalJuros: 'Totale Interessi',
    evolucaoInvestimento: 'Evoluzione Investimento',
    projecaoMesAMes: 'Proiezione mese per mese',
    mes: 'Mese',
    jurosMes: 'Interessi Mensili',
    totalAcumulado: 'Totale Accumulato',
    preenchaCliqueCalcular: 'Compila i campi e clicca Calcola',
    investindo: 'Investendo',
    porMesDurante: 'al mese per',
    anos: 'anni',
    voceAlcancara: 'raggiungerai',
    evolucaoAnual: 'Evoluzione Annuale dell\'Investimento',
    evolucaoMensal: 'Evoluzione Mensile dell\'Investimento',
  },
  
  'de': {
    planejador: 'Planer',
    investimentos: 'Investitionen',
    navegacao: 'Navigation',
    dashboard: 'Dashboard',
    calculadora: 'Rechner',
    lancamentos: 'Transaktionen',
    relatorios: 'Berichte',
    versao: 'Version',
    patrimonioTotal: 'Gesamtvermögen',
    sobraMensal: 'Monatlicher Überschuss',
    fundoEmergencia: 'Notfallfonds',
    dividas: 'Schulden',
    incomeMensal: 'Monatliches Einkommen',
    rendimentos: 'Erträge',
    gastosFixos: 'Fixkosten',
    gastosVariaveis: 'Variable Kosten',
    mesesCobertura: 'Monate Deckung',
    vsMesAnterior: 'vs Vormonat',
    incomeVsGastos: 'Einkommen vs Ausgaben',
    investimentosVsRendimentos: 'Investitionen vs Erträge',
    evolucaoDosUltimos: 'Entwicklung der letzten',
    performanceDosUltimos: 'Leistung der letzten',
    meses: 'Monate',
    income: 'Einkommen',
    gastos: 'Ausgaben',
    carregando: 'Laden...',
    nenhumDadoDisponivel: 'Keine Daten verfügbar',
    comecaAdicionandoLancamentos: 'Beginnen Sie mit dem Hinzufügen von Transaktionen auf der Transaktionsseite, um Ihre Metriken hier zu sehen.',
    novoLancamento: 'Neue Transaktion',
    historicoLancamentos: 'Transaktionsverlauf',
    todosRegistrosFinanceiros: 'Alle Ihre Finanzunterlagen',
    adicionarLancamento: 'Transaktion Hinzufügen',
    registreEntradaSaida: 'Einkommen oder Ausgabe registrieren',
    mesAno: 'Monat/Jahr',
    tipo: 'Typ',
    categoria: 'Kategorie',
    descricao: 'Beschreibung',
    valor: 'Betrag',
    acoes: 'Aktionen',
    data: 'Datum',
    entrada: 'Einkommen',
    saida: 'Ausgabe',
    cancelar: 'Abbrechen',
    adicionar: 'Hinzufügen',
    nenhumLancamentoRegistrado: 'Noch keine Transaktionen registriert.',
    cliqueNovoLancamento: 'Klicken Sie auf "Neue Transaktion" um zu beginnen.',
    temCertezaExcluir: 'Sind Sie sicher, dass Sie diese Transaktion löschen möchten?',
    receitaSalario: 'Einkommen/Gehalt',
    retornoInvestimento: 'Investitionsertrag',
    gastoFixo: 'Fixkosten',
    gastoVariavel: 'Variable Kosten',
    investimento: 'Investition',
    fundoEmergenciaCategoria: 'Notfallfonds',
    pagamentoDivida: 'Schuldenzahlung',
    periodo: 'Zeitraum',
    selecionePeriodo: 'Wählen Sie den Anzeigeraum',
    todos: 'Alle',
    mesAtual: 'Aktueller Monat',
    mesPassado: 'Letzter Monat',
    ultimos3Meses: 'Letzte 3 Monate',
    ultimos6Meses: 'Letzte 6 Monate',
    esteAno: 'Dieses Jahr',
    mesEspecifico: 'Bestimmter Monat',
    selecioneMes: 'Wählen Sie den gewünschten Monat:',
    exportarCSV: 'CSV Exportieren',
    totalEntradas: 'Gesamteinkommen',
    totalSaidas: 'Gesamtausgaben',
    saldo: 'Saldo',
    lancamentosText: 'Transaktionen',
    todosLancamentos: 'Alle Transaktionen',
    diferencaEntradasSaidas: 'Differenz zwischen Einkommen und Ausgaben',
    nenhumLancamentoPeriodo: 'Keine Transaktionen für den ausgewählten Zeitraum gefunden.',
    calculadoraPrimeiroMilhao: 'Erste Million Rechner',
    parametros: 'Parameter',
    preenchaParaCalcular: 'Füllen Sie die Werte aus, um Ihre monatliche Investition zu berechnen',
    valorInicial: 'Anfangsbetrag',
    valorFuturoDesejado: 'Gewünschter Zukunftswert',
    taxaJurosAnual: 'Jährlicher Zinssatz (%)',
    periodoAnos: 'Zeitraum (Jahre)',
    calcular: 'Berechnen',
    resultado: 'Ergebnis',
    valorInvestirMensalmente: 'Monatlich zu investierender Betrag',
    investimentoMensal: 'Monatliche Investition',
    totalInvestido: 'Insgesamt Investiert',
    totalJuros: 'Gesamtzinsen',
    evolucaoInvestimento: 'Investitionsentwicklung',
    projecaoMesAMes: 'Monat-für-Monat-Projektion',
    mes: 'Monat',
    jurosMes: 'Monatliche Zinsen',
    totalAcumulado: 'Insgesamt Akkumuliert',
    preenchaCliqueCalcular: 'Füllen Sie die Felder aus und klicken Sie auf Berechnen',
    investindo: 'Investieren',
    porMesDurante: 'pro Monat für',
    anos: 'Jahre',
    voceAlcancara: 'werden Sie erreichen',
    evolucaoAnual: 'Jährliche Investitionsentwicklung',
    evolucaoMensal: 'Monatliche Investitionsentwicklung',
  },
};
