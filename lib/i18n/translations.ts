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
  editarLancamento: string;
  atualizeDados: string;
  salvar: string;
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
  
  // Autenticação
  entrar: string;
  sair: string;
  perfil: string;
  minhaConta: string;
  continuarComoConvidado: string;
  modoConvidado: string;
  usuarioConvidado: string;
  fazerLogin: string;
  criarConta: string;
  bemVindo: string;
  configuracoes: string;
  
  // Moeda
  moeda: string;
  selecioneMoeda: string;
  taxaCambio: string;
  ultimaAtualizacao: string;
  convertendoPara: string;
  moedaBase: string;
  
  // Banco de Dados
  salvando: string;
  salvo: string;
  sincronizando: string;
  sincronizado: string;
  erroAoSalvar: string;
  erroAoCarregar: string;
  tentarNovamente: string;
  dadosLocais: string;
  dadosNaNuvem: string;
  migrarDados: string;
  migracaoConcluida: string;
  
  // Welcome Modal
  welcomeToPlanner: string;
  organizeFinances: string;
  startNow: string;
  loginToAccount: string;
  createAccountButton: string;
  orSeparator: string;
  continueAsGuest: string;
  guestDataInfo: string;
  
  // Guest Warning
  guestWarningTitle: string;
  guestWarningDescription: string;
  
  // Toast Messages
  syncingData: string;
  syncingDescription: string;
  syncSuccess: string;
  syncSuccessDescription: string;
  syncError: string;
  syncErrorDescription: string;
  transactionAdded: string;
  transactionUpdated: string;
  transactionDeleted: string;
  errorSaving: string;
  errorUpdating: string;
  errorDeleting: string;
  networkError: string;
  errorGeneric: string;
  success: string;
  error: string;
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
    editarLancamento: 'Editar Lançamento',
    atualizeDados: 'Atualize os dados do lançamento',
    salvar: 'Salvar',
    
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
    
    // Autenticação
    entrar: 'Entrar',
    sair: 'Sair',
    perfil: 'Perfil',
    minhaConta: 'Minha Conta',
    continuarComoConvidado: 'Continuar como Convidado',
    modoConvidado: 'Modo Convidado',
    usuarioConvidado: 'Usuário Convidado',
    fazerLogin: 'Fazer Login',
    criarConta: 'Criar Conta',
    bemVindo: 'Bem-vindo',
    configuracoes: 'Configurações',
    
    // Moeda
    moeda: 'Moeda',
    selecioneMoeda: 'Selecione a moeda',
    taxaCambio: 'Taxa de Câmbio',
    ultimaAtualizacao: 'Última atualização',
    convertendoPara: 'Convertendo para',
    moedaBase: 'Moeda base',
    
    // Banco de Dados
    salvando: 'Salvando...',
    salvo: 'Salvo',
    sincronizando: 'Sincronizando...',
    sincronizado: 'Sincronizado',
    erroAoSalvar: 'Erro ao salvar',
    erroAoCarregar: 'Erro ao carregar',
    tentarNovamente: 'Tentar novamente',
    dadosLocais: 'Dados locais',
    dadosNaNuvem: 'Dados na nuvem',
    migrarDados: 'Migrar dados',
    migracaoConcluida: 'Migração concluída',
    
    // Welcome Modal
    welcomeToPlanner: 'Bem-vindo ao Planejador',
    organizeFinances: 'Organize suas finanças de forma simples e eficiente.',
    startNow: 'Você pode começar agora mesmo!',
    loginToAccount: 'Entrar na minha conta',
    createAccountButton: 'Criar uma conta',
    orSeparator: 'Ou',
    continueAsGuest: 'Continuar como Convidado',
    guestDataInfo: 'Modo convidado salva dados apenas neste dispositivo.',
    
    // Guest Warning
    guestWarningTitle: 'Você está no modo convidado',
    guestWarningDescription: 'Seus dados estão salvos apenas neste dispositivo. Crie uma conta para salvar na nuvem.',
    
    // Toast Messages
    syncingData: 'Sincronizando dados...',
    syncingDescription: 'Passando seus dados locais para a nuvem.',
    syncSuccess: 'Sucesso!',
    syncSuccessDescription: 'Dados sincronizados com sucesso.',
    syncError: 'Erro na sincronização',
    syncErrorDescription: 'Não foi possível salvar seus dados locais.',
    transactionAdded: 'Lançamento adicionado.',
    transactionUpdated: 'Lançamento atualizado.',
    transactionDeleted: 'Lançamento removido.',
    errorSaving: 'Erro ao salvar lançamento.',
    errorUpdating: 'Falha ao atualizar.',
    errorDeleting: 'Falha ao remover.',
    networkError: 'Falha de rede ou servidor.',
    errorGeneric: 'Algo deu errado.',
    success: 'Sucesso',
    error: 'Erro',
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
    editarLancamento: 'Edit Transaction',
    atualizeDados: 'Update transaction details',
    salvar: 'Save',
    
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
    
    // Authentication
    entrar: 'Sign In',
    sair: 'Sign Out',
    perfil: 'Profile',
    minhaConta: 'My Account',
    continuarComoConvidado: 'Continue as Guest',
    modoConvidado: 'Guest Mode',
    usuarioConvidado: 'Guest User',
    fazerLogin: 'Login',
    criarConta: 'Create Account',
    bemVindo: 'Welcome',
    configuracoes: 'Settings',
    
    // Currency
    moeda: 'Currency',
    selecioneMoeda: 'Select currency',
    taxaCambio: 'Exchange Rate',
    ultimaAtualizacao: 'Last updated',
    convertendoPara: 'Converting to',
    moedaBase: 'Base currency',
    
    // Database
    salvando: 'Saving...',
    salvo: 'Saved',
    sincronizando: 'Syncing...',
    sincronizado: 'Synced',
    erroAoSalvar: 'Error saving',
    erroAoCarregar: 'Error loading',
    tentarNovamente: 'Try again',
    dadosLocais: 'Local data',
    dadosNaNuvem: 'Cloud data',
    migrarDados: 'Migrate data',
    migracaoConcluida: 'Migration completed',
    
    // Welcome Modal
    welcomeToPlanner: 'Welcome to the Planner',
    organizeFinances: 'Organize your finances simply and efficiently.',
    startNow: 'You can start right now!',
    loginToAccount: 'Login to my account',
    createAccountButton: 'Create an account',
    orSeparator: 'Or',
    continueAsGuest: 'Continue as Guest',
    guestDataInfo: 'Guest mode saves data only on this device.',
    
    // Guest Warning
    guestWarningTitle: 'You are in guest mode',
    guestWarningDescription: 'Your data is saved only on this device. Create an account to save to the cloud.',
    
    // Toast Messages
    syncingData: 'Syncing data...',
    syncingDescription: 'Uploading your local data to the cloud.',
    syncSuccess: 'Success!',
    syncSuccessDescription: 'Data synced successfully.',
    syncError: 'Sync error',
    syncErrorDescription: 'Could not save your local data.',
    transactionAdded: 'Transaction added.',
    transactionUpdated: 'Transaction updated.',
    transactionDeleted: 'Transaction deleted.',
    errorSaving: 'Error saving transaction.',
    errorUpdating: 'Failed to update.',
    errorDeleting: 'Failed to delete.',
    networkError: 'Network or server error.',
    errorGeneric: 'Something went wrong.',
    success: 'Success',
    error: 'Error',
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
    editarLancamento: 'Tranzakció Szerkesztése',
    atualizeDados: 'Frissítse a tranzakció adatait',
    salvar: 'Mentés',
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
    
    // Hitelesítés
    entrar: 'Belépés',
    sair: 'Kilépés',
    perfil: 'Profil',
    minhaConta: 'Fiókom',
    continuarComoConvidado: 'Folytatás vendégként',
    modoConvidado: 'Vendég mód',
    usuarioConvidado: 'Vendég felhasználó',
    fazerLogin: 'Bejelentkezés',
    criarConta: 'Fiók létrehozása',
    bemVindo: 'Üdvözöljük',
    configuracoes: 'Beállítások',
    
    // Pénznem
    moeda: 'Pénznem',
    selecioneMoeda: 'Válasszon pénznemet',
    taxaCambio: 'Árfolyam',
    ultimaAtualizacao: 'Utoljára frissítve',
    convertendoPara: 'Átváltás',
    moedaBase: 'Alapvaluta',
    
    // Adatbázis
    salvando: 'Mentés...',
    salvo: 'Mentve',
    sincronizando: 'Szinkronizálás...',
    sincronizado: 'Szinkronizálva',
    erroAoSalvar: 'Mentési hiba',
    erroAoCarregar: 'Betöltési hiba',
    tentarNovamente: 'Próbálja újra',
    dadosLocais: 'Helyi adatok',
    dadosNaNuvem: 'Felhő adatok',
    migrarDados: 'Adatok migrálása',
    migracaoConcluida: 'Migráció befejezve',
    
    // Welcome Modal
    welcomeToPlanner: 'Üdvözöljük a Tervezőben',
    organizeFinances: 'Rendezze pénzügyeit egyszerűen és hatékonyan.',
    startNow: 'Kezdje el most!',
    loginToAccount: 'Bejelentkezés a fiókomba',
    createAccountButton: 'Fiók létrehozása',
    orSeparator: 'Vagy',
    continueAsGuest: 'Folytatás vendégként',
    guestDataInfo: 'Vendég mód csak ezen a készüléken menti az adatokat.',
    
    // Guest Warning
    guestWarningTitle: 'Vendég módban van',
    guestWarningDescription: 'Az adatai csak ezen a készüléken vannak mentve. Hozzon létre fiókot a felhőbe mentéshez.',
    
    // Toast Messages
    syncingData: 'Adatok szinkronizálása...',
    syncingDescription: 'Helyi adatok feltöltése a felhőbe.',
    syncSuccess: 'Sikeres!',
    syncSuccessDescription: 'Adatok sikeresen szinkronizálva.',
    syncError: 'Szinkronizálási hiba',
    syncErrorDescription: 'Nem sikerült menteni a helyi adatokat.',
    transactionAdded: 'Tranzakció hozzáadva.',
    transactionUpdated: 'Tranzakció frissítve.',
    transactionDeleted: 'Tranzakció törölve.',
    errorSaving: 'Hiba a tranzakció mentésekor.',
    errorUpdating: 'Sikertelen frissítés.',
    errorDeleting: 'Sikertelen törlés.',
    networkError: 'Hálózati vagy szerverhiba.',
    errorGeneric: 'Valami hiba történt.',
    success: 'Sikeres',
    error: 'Hiba',
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
    editarLancamento: 'Modifica Transazione',
    atualizeDados: 'Aggiorna i dettagli della transazione',
    salvar: 'Salva',
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
    
    // Autenticazione
    entrar: 'Accedi',
    sair: 'Esci',
    perfil: 'Profilo',
    minhaConta: 'Il mio account',
    continuarComoConvidado: 'Continua come ospite',
    modoConvidado: 'Modalità ospite',
    usuarioConvidado: 'Utente ospite',
    fazerLogin: 'Accedi',
    criarConta: 'Crea account',
    bemVindo: 'Benvenuto',
    configuracoes: 'Impostazioni',
    
    // Valuta
    moeda: 'Valuta',
    selecioneMoeda: 'Seleziona valuta',
    taxaCambio: 'Tasso di cambio',
    ultimaAtualizacao: 'Ultimo aggiornamento',
    convertendoPara: 'Conversione in',
    moedaBase: 'Valuta base',
    
    // Database
    salvando: 'Salvataggio...',
    salvo: 'Salvato',
    sincronizando: 'Sincronizzazione...',
    sincronizado: 'Sincronizzato',
    erroAoSalvar: 'Errore di salvataggio',
    erroAoCarregar: 'Errore di caricamento',
    tentarNovamente: 'Riprova',
    dadosLocais: 'Dati locali',
    dadosNaNuvem: 'Dati cloud',
    migrarDados: 'Migra dati',
    migracaoConcluida: 'Migrazione completata',
    
    // Welcome Modal
    welcomeToPlanner: 'Benvenuto nel Pianificatore',
    organizeFinances: 'Organizza le tue finanze in modo semplice ed efficiente.',
    startNow: 'Puoi iniziare subito!',
    loginToAccount: 'Accedi al mio account',
    createAccountButton: 'Crea un account',
    orSeparator: 'Oppure',
    continueAsGuest: 'Continua come ospite',
    guestDataInfo: 'La modalità ospite salva i dati solo su questo dispositivo.',
    
    // Guest Warning
    guestWarningTitle: 'Sei in modalità ospite',
    guestWarningDescription: 'I tuoi dati sono salvati solo su questo dispositivo. Crea un account per salvarli nel cloud.',
    
    // Toast Messages
    syncingData: 'Sincronizzazione dati...',
    syncingDescription: 'Caricamento dei dati locali nel cloud.',
    syncSuccess: 'Successo!',
    syncSuccessDescription: 'Dati sincronizzati con successo.',
    syncError: 'Errore di sincronizzazione',
    syncErrorDescription: 'Impossibile salvare i dati locali.',
    transactionAdded: 'Transazione aggiunta.',
    transactionUpdated: 'Transazione aggiornata.',
    transactionDeleted: 'Transazione eliminata.',
    errorSaving: 'Errore nel salvataggio della transazione.',
    errorUpdating: 'Aggiornamento fallito.',
    errorDeleting: 'Eliminazione fallita.',
    networkError: 'Errore di rete o server.',
    errorGeneric: 'Qualcosa è andato storto.',
    success: 'Successo',
    error: 'Errore',
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
    editarLancamento: 'Transaktion Bearbeiten',
    atualizeDados: 'Transaktionsdetails aktualisieren',
    salvar: 'Speichern',
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
    
    // Authentifizierung
    entrar: 'Anmelden',
    sair: 'Abmelden',
    perfil: 'Profil',
    minhaConta: 'Mein Konto',
    continuarComoConvidado: 'Als Gast fortfahren',
    modoConvidado: 'Gastmodus',
    usuarioConvidado: 'Gastbenutzer',
    fazerLogin: 'Anmelden',
    criarConta: 'Konto erstellen',
    bemVindo: 'Willkommen',
    configuracoes: 'Einstellungen',
    
    // Währung
    moeda: 'Währung',
    selecioneMoeda: 'Währung auswählen',
    taxaCambio: 'Wechselkurs',
    ultimaAtualizacao: 'Zuletzt aktualisiert',
    convertendoPara: 'Umrechnung in',
    moedaBase: 'Basiswährung',
    
    // Datenbank
    salvando: 'Speichern...',
    salvo: 'Gespeichert',
    sincronizando: 'Synchronisieren...',
    sincronizado: 'Synchronisiert',
    erroAoSalvar: 'Fehler beim Speichern',
    erroAoCarregar: 'Fehler beim Laden',
    tentarNovamente: 'Erneut versuchen',
    dadosLocais: 'Lokale Daten',
    dadosNaNuvem: 'Cloud-Daten',
    migrarDados: 'Daten migrieren',
    migracaoConcluida: 'Migration abgeschlossen',
    
    // Welcome Modal
    welcomeToPlanner: 'Willkommen beim Planer',
    organizeFinances: 'Organisieren Sie Ihre Finanzen einfach und effizient.',
    startNow: 'Sie können jetzt loslegen!',
    loginToAccount: 'In mein Konto einloggen',
    createAccountButton: 'Konto erstellen',
    orSeparator: 'Oder',
    continueAsGuest: 'Als Gast fortfahren',
    guestDataInfo: 'Gastmodus speichert Daten nur auf diesem Gerät.',
    
    // Guest Warning
    guestWarningTitle: 'Sie sind im Gastmodus',
    guestWarningDescription: 'Ihre Daten werden nur auf diesem Gerät gespeichert. Erstellen Sie ein Konto, um in der Cloud zu speichern.',
    
    // Toast Messages
    syncingData: 'Daten synchronisieren...',
    syncingDescription: 'Lokale Daten in die Cloud hochladen.',
    syncSuccess: 'Erfolg!',
    syncSuccessDescription: 'Daten erfolgreich synchronisiert.',
    syncError: 'Synchronisierungsfehler',
    syncErrorDescription: 'Lokale Daten konnten nicht gespeichert werden.',
    transactionAdded: 'Transaktion hinzugefügt.',
    transactionUpdated: 'Transaktion aktualisiert.',
    transactionDeleted: 'Transaktion gelöscht.',
    errorSaving: 'Fehler beim Speichern der Transaktion.',
    errorUpdating: 'Aktualisierung fehlgeschlagen.',
    errorDeleting: 'Löschen fehlgeschlagen.',
    networkError: 'Netzwerk- oder Serverfehler.',
    errorGeneric: 'Etwas ist schief gelaufen.',
    success: 'Erfolg',
    error: 'Fehler',
  },
};

