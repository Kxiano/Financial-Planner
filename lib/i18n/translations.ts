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

  // Redesign
  visaoGeral: string;
  esteMes: string;
  investidoNoMes: string;
  daRenda: string;
  fluxoCaixa: string;
  fluxoCaixaDesc: string;
  evolucaoPatrimonio: string;
  paraOndeFoi: string;
  ultimosLancamentos: string;
  verTodos: string;
  buscar: string;
  todasCategorias: string;
  excluir: string;
  excluirLancamento: string;
  excluirDescricao: string;
  editar: string;
  nenhumResultado: string;
  limparFiltros: string;
  porCategoria: string;
  idioma: string;
  tema: string;
  claro: string;
  escuro: string;
  abrirMenu: string;
  atualizarTaxas: string;
  descricaoPlaceholder: string;
  camposObrigatorios: string;
  ano: string;
  juros: string;
  liquido: string;
  porMes: string;
  preferencias: string;
  heroTitulo: string;
  heroTexto: string;
  experimentarConvidado: string;
  metaInvalida: string;
};

export type TranslationKey = keyof TranslationKeys;

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
    patrimonioTotal: 'Patrimônio total',
    sobraMensal: 'Sobra mensal',
    fundoEmergencia: 'Fundo de emergência',
    dividas: 'Dívidas',
    incomeMensal: 'Income mensal',
    rendimentos: 'Rendimentos',
    gastosFixos: 'Gastos fixos',
    gastosVariaveis: 'Gastos variáveis',
    mesesCobertura: 'meses de cobertura',
    vsMesAnterior: 'vs mês anterior',
    incomeVsGastos: 'Income vs gastos',
    investimentosVsRendimentos: 'Investimentos vs rendimentos',
    evolucaoDosUltimos: 'Evolução dos últimos',
    performanceDosUltimos: 'Performance dos últimos',
    meses: 'meses',
    income: 'Income',
    gastos: 'Gastos',
    carregando: 'Carregando...',
    nenhumDadoDisponivel: 'Nenhum dado disponível',
    comecaAdicionandoLancamentos: 'Comece adicionando lançamentos na página de lançamentos para ver suas métricas aqui.',
    
    // Lançamentos
    novoLancamento: 'Novo lançamento',
    historicoLancamentos: 'Histórico de lançamentos',
    todosRegistrosFinanceiros: 'Todos os seus registros financeiros',
    adicionarLancamento: 'Adicionar lançamento',
    registreEntradaSaida: 'Registre uma entrada ou saída financeira',
    mesAno: 'Mês/Ano',
    tipo: 'Tipo',
    categoria: 'Categoria',
    descricao: 'Descrição',
    valor: 'Valor',
    acoes: 'Ações',
    data: 'Data',
    entrada: 'Entrada',
    saida: 'Saída',
    cancelar: 'Cancelar',
    adicionar: 'Adicionar',
    nenhumLancamentoRegistrado: 'Nenhum lançamento registrado ainda.',
    cliqueNovoLancamento: 'Clique em "Novo lançamento" para começar.',
    temCertezaExcluir: 'Tem certeza que deseja excluir este lançamento?',
    editarLancamento: 'Editar lançamento',
    atualizeDados: 'Atualize os dados do lançamento',
    salvar: 'Salvar',
    
    // Categorias
    receitaSalario: 'Receita/Salário',
    retornoInvestimento: 'Retorno de investimento',
    gastoFixo: 'Gasto fixo',
    gastoVariavel: 'Gasto variável',
    investimento: 'Investimento',
    fundoEmergenciaCategoria: 'Fundo de emergência',
    pagamentoDivida: 'Pagamento de dívida',
    
    // Relatórios
    periodo: 'Período',
    selecionePeriodo: 'Selecione o período para visualização',
    todos: 'Todos',
    mesAtual: 'Mês atual',
    mesPassado: 'Mês passado',
    ultimos3Meses: 'Últimos 3 meses',
    ultimos6Meses: 'Últimos 6 meses',
    esteAno: 'Este ano',
    mesEspecifico: 'Mês específico',
    selecioneMes: 'Selecione o mês desejado:',
    exportarCSV: 'Exportar CSV',
    totalEntradas: 'Total entradas',
    totalSaidas: 'Total saídas',
    saldo: 'Saldo',
    lancamentosText: 'lançamentos',
    todosLancamentos: 'Todos os lançamentos',
    diferencaEntradasSaidas: 'Diferença entre entradas e saídas',
    nenhumLancamentoPeriodo: 'Nenhum lançamento encontrado para o período selecionado.',
    
    // Calculadora
    calculadoraPrimeiroMilhao: 'Calculadora do primeiro milhão',
    parametros: 'Parâmetros',
    preenchaParaCalcular: 'Preencha os valores para calcular seu investimento mensal',
    valorInicial: 'Valor inicial',
    valorFuturoDesejado: 'Valor futuro desejado',
    taxaJurosAnual: 'Taxa de juros anual (%)',
    periodoAnos: 'Período (anos)',
    calcular: 'Calcular',
    resultado: 'Resultado',
    valorInvestirMensalmente: 'Valor que você precisa investir mensalmente',
    investimentoMensal: 'Investimento mensal',
    totalInvestido: 'Total investido',
    totalJuros: 'Total de juros',
    evolucaoInvestimento: 'Evolução do investimento',
    projecaoMesAMes: 'Projeção mês a mês do crescimento do seu patrimônio',
    mes: 'Mês',
    jurosMes: 'Juros do mês',
    totalAcumulado: 'Total acumulado',
    preenchaCliqueCalcular: 'Preencha os campos e clique em Calcular',
    investindo: 'Investindo',
    porMesDurante: 'por mês durante',
    anos: 'anos',
    voceAlcancara: 'você alcançará',
    evolucaoAnual: 'Evolução anual do investimento',
    evolucaoMensal: 'Evolução mensal do investimento',
    
    // Autenticação
    entrar: 'Entrar',
    sair: 'Sair',
    perfil: 'Perfil',
    minhaConta: 'Minha conta',
    continuarComoConvidado: 'Continuar como convidado',
    modoConvidado: 'Modo convidado',
    usuarioConvidado: 'Usuário convidado',
    fazerLogin: 'Fazer login',
    criarConta: 'Criar conta',
    bemVindo: 'Bem-vindo',
    configuracoes: 'Configurações',
    
    // Moeda
    moeda: 'Moeda',
    selecioneMoeda: 'Selecione a moeda',
    taxaCambio: 'Taxa de câmbio',
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
    continueAsGuest: 'Continuar como convidado',
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

    // Redesign
    visaoGeral: 'Visão geral',
    esteMes: 'Este mês',
    investidoNoMes: 'Investido e reservado',
    daRenda: 'da renda',
    fluxoCaixa: 'Fluxo de caixa',
    fluxoCaixaDesc: 'Renda e gastos por mês',
    evolucaoPatrimonio: 'Patrimônio ao longo do tempo',
    paraOndeFoi: 'Para onde foi o dinheiro',
    ultimosLancamentos: 'Últimos lançamentos',
    verTodos: 'Ver todos os lançamentos',
    buscar: 'Buscar lançamentos',
    todasCategorias: 'Todas as categorias',
    excluir: 'Excluir',
    excluirLancamento: 'Excluir lançamento',
    excluirDescricao: 'Ele sai do seu histórico e dos totais.',
    editar: 'Editar',
    nenhumResultado: 'Nenhum lançamento corresponde a esses filtros.',
    limparFiltros: 'Limpar filtros',
    porCategoria: 'Saídas por categoria',
    idioma: 'Idioma',
    tema: 'Tema',
    claro: 'Claro',
    escuro: 'Escuro',
    abrirMenu: 'Abrir menu',
    atualizarTaxas: 'Atualizar taxas de câmbio',
    descricaoPlaceholder: 'Salário, aluguel, supermercado',
    camposObrigatorios: 'Preencha a descrição e o valor.',
    ano: 'Ano',
    juros: 'Juros',
    liquido: 'Líquido',
    porMes: 'por mês',
    preferencias: 'Preferências',
    heroTitulo: 'Um planejador financeiro pessoal para quem cansou de planilhas',
    heroTexto: 'Registre renda, contas e investimentos por mês. O Planejador calcula seu patrimônio, sua sobra mensal e quantos meses seu fundo de emergência cobre, em 5 moedas.',
    experimentarConvidado: 'Experimentar como convidado',
    metaInvalida: 'Informe uma meta maior que o valor inicial e um período de pelo menos um ano.',
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
    patrimonioTotal: 'Total assets',
    sobraMensal: 'Monthly surplus',
    fundoEmergencia: 'Emergency fund',
    dividas: 'Debts',
    incomeMensal: 'Monthly income',
    rendimentos: 'Returns',
    gastosFixos: 'Fixed expenses',
    gastosVariaveis: 'Variable expenses',
    mesesCobertura: 'months coverage',
    vsMesAnterior: 'vs previous month',
    incomeVsGastos: 'Income vs expenses',
    investimentosVsRendimentos: 'Investments vs returns',
    evolucaoDosUltimos: 'Evolution of the last',
    performanceDosUltimos: 'Performance of the last',
    meses: 'months',
    income: 'Income',
    gastos: 'Expenses',
    carregando: 'Loading...',
    nenhumDadoDisponivel: 'No data available',
    comecaAdicionandoLancamentos: 'Start by adding transactions on the transactions page to see your metrics here.',
    
    // Lançamentos
    novoLancamento: 'New transaction',
    historicoLancamentos: 'Transaction history',
    todosRegistrosFinanceiros: 'All your financial records',
    adicionarLancamento: 'Add transaction',
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
    cliqueNovoLancamento: 'Click "New transaction" to get started.',
    temCertezaExcluir: 'Are you sure you want to delete this transaction?',
    editarLancamento: 'Edit transaction',
    atualizeDados: 'Update transaction details',
    salvar: 'Save',
    
    // Categorias
    receitaSalario: 'Income/Salary',
    retornoInvestimento: 'Investment return',
    gastoFixo: 'Fixed expense',
    gastoVariavel: 'Variable expense',
    investimento: 'Investment',
    fundoEmergenciaCategoria: 'Emergency fund',
    pagamentoDivida: 'Debt payment',
    
    // Relatórios
    periodo: 'Period',
    selecionePeriodo: 'Select the period for viewing',
    todos: 'All',
    mesAtual: 'Current month',
    mesPassado: 'Last month',
    ultimos3Meses: 'Last 3 months',
    ultimos6Meses: 'Last 6 months',
    esteAno: 'This year',
    mesEspecifico: 'Specific month',
    selecioneMes: 'Select the desired month:',
    exportarCSV: 'Export CSV',
    totalEntradas: 'Total income',
    totalSaidas: 'Total expenses',
    saldo: 'Balance',
    lancamentosText: 'transactions',
    todosLancamentos: 'All transactions',
    diferencaEntradasSaidas: 'Difference between income and expenses',
    nenhumLancamentoPeriodo: 'No transactions found for the selected period.',
    
    // Calculadora
    calculadoraPrimeiroMilhao: 'First million calculator',
    parametros: 'Parameters',
    preenchaParaCalcular: 'Fill in the values to calculate your monthly investment',
    valorInicial: 'Initial amount',
    valorFuturoDesejado: 'Desired future value',
    taxaJurosAnual: 'Annual interest rate (%)',
    periodoAnos: 'Period (years)',
    calcular: 'Calculate',
    resultado: 'Result',
    valorInvestirMensalmente: 'Amount you need to invest monthly',
    investimentoMensal: 'Monthly investment',
    totalInvestido: 'Total invested',
    totalJuros: 'Total interest',
    evolucaoInvestimento: 'Investment evolution',
    projecaoMesAMes: 'Month-by-month projection of your wealth growth',
    mes: 'Month',
    jurosMes: 'Monthly interest',
    totalAcumulado: 'Total accumulated',
    preenchaCliqueCalcular: 'Fill in the fields and click Calculate',
    investindo: 'Investing',
    porMesDurante: 'per month for',
    anos: 'years',
    voceAlcancara: 'you will reach',
    evolucaoAnual: 'Annual investment evolution',
    evolucaoMensal: 'Monthly investment evolution',
    
    // Authentication
    entrar: 'Sign in',
    sair: 'Sign out',
    perfil: 'Profile',
    minhaConta: 'My account',
    continuarComoConvidado: 'Continue as guest',
    modoConvidado: 'Guest mode',
    usuarioConvidado: 'Guest user',
    fazerLogin: 'Login',
    criarConta: 'Create account',
    bemVindo: 'Welcome',
    configuracoes: 'Settings',
    
    // Currency
    moeda: 'Currency',
    selecioneMoeda: 'Select currency',
    taxaCambio: 'Exchange rate',
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
    continueAsGuest: 'Continue as guest',
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

    // Redesign
    visaoGeral: 'Overview',
    esteMes: 'This month',
    investidoNoMes: 'Invested and set aside',
    daRenda: 'of income',
    fluxoCaixa: 'Cash flow',
    fluxoCaixaDesc: 'Income and expenses by month',
    evolucaoPatrimonio: 'Net worth over time',
    paraOndeFoi: 'Where the money went',
    ultimosLancamentos: 'Recent transactions',
    verTodos: 'View all transactions',
    buscar: 'Search transactions',
    todasCategorias: 'All categories',
    excluir: 'Delete',
    excluirLancamento: 'Delete transaction',
    excluirDescricao: 'It is removed from your history and your totals.',
    editar: 'Edit',
    nenhumResultado: 'No transactions match these filters.',
    limparFiltros: 'Clear filters',
    porCategoria: 'Money out by category',
    idioma: 'Language',
    tema: 'Theme',
    claro: 'Light',
    escuro: 'Dark',
    abrirMenu: 'Open menu',
    atualizarTaxas: 'Refresh exchange rates',
    descricaoPlaceholder: 'Salary, rent, groceries',
    camposObrigatorios: 'Fill in a description and an amount.',
    ano: 'Year',
    juros: 'Interest',
    liquido: 'Net',
    porMes: 'per month',
    preferencias: 'Preferences',
    heroTitulo: 'A personal finance planner for people done with spreadsheets',
    heroTexto: 'Log income, bills and investments by month. Planner works out your net worth, your monthly surplus and how many months your emergency fund covers, in 5 currencies.',
    experimentarConvidado: 'Try it as a guest',
    metaInvalida: 'Enter a target above the starting amount and a period of at least one year.',
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
    patrimonioTotal: 'Teljes vagyon',
    sobraMensal: 'Havi többlet',
    fundoEmergencia: 'Vészhelyzeti alap',
    dividas: 'Adósságok',
    incomeMensal: 'Havi jövedelem',
    rendimentos: 'Hozamok',
    gastosFixos: 'Fix kiadások',
    gastosVariaveis: 'Változó kiadások',
    mesesCobertura: 'hónap fedezet',
    vsMesAnterior: 'vs előző hónap',
    incomeVsGastos: 'Jövedelem vs kiadások',
    investimentosVsRendimentos: 'Befektetések vs hozamok',
    evolucaoDosUltimos: 'Az elmúlt fejlődése',
    performanceDosUltimos: 'Az elmúlt teljesítménye',
    meses: 'hónap',
    income: 'Jövedelem',
    gastos: 'Kiadások',
    carregando: 'Betöltés...',
    nenhumDadoDisponivel: 'Nincs elérhető adat',
    comecaAdicionandoLancamentos: 'Kezdje tranzakciók hozzáadásával a tranzakciók oldalon a metrikák megtekintéséhez.',
    novoLancamento: 'Új tranzakció',
    historicoLancamentos: 'Tranzakciós előzmények',
    todosRegistrosFinanceiros: 'Összes pénzügyi rekord',
    adicionarLancamento: 'Tranzakció hozzáadása',
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
    cliqueNovoLancamento: 'Kattintson az "Új tranzakció" gombra a kezdéshez.',
    temCertezaExcluir: 'Biztosan törölni szeretné ezt a tranzakciót?',
    editarLancamento: 'Tranzakció szerkesztése',
    atualizeDados: 'Frissítse a tranzakció adatait',
    salvar: 'Mentés',
    receitaSalario: 'Jövedelem/Fizetés',
    retornoInvestimento: 'Befektetési hozam',
    gastoFixo: 'Fix kiadás',
    gastoVariavel: 'Változó kiadás',
    investimento: 'Befektetés',
    fundoEmergenciaCategoria: 'Vészhelyzeti alap',
    pagamentoDivida: 'Adósság törlesztés',
    periodo: 'Időszak',
    selecionePeriodo: 'Válassza ki a megtekintési időszakot',
    todos: 'Összes',
    mesAtual: 'Aktuális hónap',
    mesPassado: 'Előző hónap',
    ultimos3Meses: 'Utolsó 3 hónap',
    ultimos6Meses: 'Utolsó 6 hónap',
    esteAno: 'Ez az év',
    mesEspecifico: 'Meghatározott hónap',
    selecioneMes: 'Válassza ki a kívánt hónapot:',
    exportarCSV: 'CSV exportálás',
    totalEntradas: 'Összes jövedelem',
    totalSaidas: 'Összes kiadás',
    saldo: 'Egyenleg',
    lancamentosText: 'tranzakció',
    todosLancamentos: 'Összes tranzakció',
    diferencaEntradasSaidas: 'Jövedelem és kiadások közötti különbség',
    nenhumLancamentoPeriodo: 'Nem találhatók tranzakciók a kiválasztott időszakban.',
    calculadoraPrimeiroMilhao: 'Első millió számológép',
    parametros: 'Paraméterek',
    preenchaParaCalcular: 'Töltse ki az értékeket a havi befektetés kiszámításához',
    valorInicial: 'Kezdő összeg',
    valorFuturoDesejado: 'Kívánt jövőbeli érték',
    taxaJurosAnual: 'Éves kamatláb (%)',
    periodoAnos: 'Időszak (év)',
    calcular: 'Számítás',
    resultado: 'Eredmény',
    valorInvestirMensalmente: 'Havonta befektetendő összeg',
    investimentoMensal: 'Havi befektetés',
    totalInvestido: 'Összes befektetett',
    totalJuros: 'Összes kamat',
    evolucaoInvestimento: 'Befektetés fejlődése',
    projecaoMesAMes: 'Hónapról hónapra előrejelzés',
    mes: 'Hónap',
    jurosMes: 'Havi kamat',
    totalAcumulado: 'Összes felhalmozott',
    preenchaCliqueCalcular: 'Töltse ki a mezőket és kattintson a számítás gombra',
    investindo: 'Befektetve',
    porMesDurante: 'havonta',
    anos: 'év',
    voceAlcancara: 'el fogja érni',
    evolucaoAnual: 'Éves befektetés fejlődés',
    evolucaoMensal: 'Havi befektetés fejlődés',
    
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
    welcomeToPlanner: 'Üdvözöljük a tervezőben',
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

    // Redesign
    visaoGeral: 'Áttekintés',
    esteMes: 'Ez a hónap',
    investidoNoMes: 'Befektetve és félretéve',
    daRenda: 'a bevételből',
    fluxoCaixa: 'Pénzforgalom',
    fluxoCaixaDesc: 'Bevételek és kiadások havonta',
    evolucaoPatrimonio: 'A vagyon alakulása',
    paraOndeFoi: 'Hová ment a pénz',
    ultimosLancamentos: 'Legutóbbi tranzakciók',
    verTodos: 'Összes tranzakció megtekintése',
    buscar: 'Tranzakciók keresése',
    todasCategorias: 'Minden kategória',
    excluir: 'Törlés',
    excluirLancamento: 'Tranzakció törlése',
    excluirDescricao: 'Eltűnik az előzményekből és az összesítésekből.',
    editar: 'Szerkesztés',
    nenhumResultado: 'Nincs a szűrőknek megfelelő tranzakció.',
    limparFiltros: 'Szűrők törlése',
    porCategoria: 'Kiadások kategóriánként',
    idioma: 'Nyelv',
    tema: 'Téma',
    claro: 'Világos',
    escuro: 'Sötét',
    abrirMenu: 'Menü megnyitása',
    atualizarTaxas: 'Árfolyamok frissítése',
    descricaoPlaceholder: 'Fizetés, lakbér, bevásárlás',
    camposObrigatorios: 'Add meg a leírást és az összeget.',
    ano: 'Év',
    juros: 'Kamat',
    liquido: 'Nettó',
    porMes: 'havonta',
    preferencias: 'Beállítások',
    heroTitulo: 'Személyes pénzügyi tervező azoknak, akiknek elegük van a táblázatokból',
    heroTexto: 'Rögzítsd havonta a bevételeidet, számláidat és befektetéseidet. A tervező kiszámolja a vagyonodat, a havi megtakarításodat és azt, hány hónapot fedez a vésztartalékod, 5 pénznemben.',
    experimentarConvidado: 'Kipróbálom vendégként',
    metaInvalida: 'Adj meg a kezdő összegnél nagyobb célt és legalább egy éves időszakot.',
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
    patrimonioTotal: 'Patrimonio totale',
    sobraMensal: 'Surplus mensile',
    fundoEmergencia: 'Fondo di emergenza',
    dividas: 'Debiti',
    incomeMensal: 'Reddito mensile',
    rendimentos: 'Rendimenti',
    gastosFixos: 'Spese fisse',
    gastosVariaveis: 'Spese variabili',
    mesesCobertura: 'mesi di copertura',
    vsMesAnterior: 'vs mese precedente',
    incomeVsGastos: 'Reddito vs spese',
    investimentosVsRendimentos: 'Investimenti vs rendimenti',
    evolucaoDosUltimos: 'Evoluzione degli ultimi',
    performanceDosUltimos: 'Performance degli ultimi',
    meses: 'mesi',
    income: 'Reddito',
    gastos: 'Spese',
    carregando: 'Caricamento...',
    nenhumDadoDisponivel: 'Nessun dato disponibile',
    comecaAdicionandoLancamentos: 'Inizia aggiungendo transazioni nella pagina transazioni per vedere le tue metriche qui.',
    novoLancamento: 'Nuova transazione',
    historicoLancamentos: 'Storico transazioni',
    todosRegistrosFinanceiros: 'Tutti i tuoi registri finanziari',
    adicionarLancamento: 'Aggiungi transazione',
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
    cliqueNovoLancamento: 'Clicca "Nuova transazione" per iniziare.',
    temCertezaExcluir: 'Sei sicuro di voler eliminare questa transazione?',
    editarLancamento: 'Modifica transazione',
    atualizeDados: 'Aggiorna i dettagli della transazione',
    salvar: 'Salva',
    receitaSalario: 'Reddito/Stipendio',
    retornoInvestimento: 'Rendimento investimento',
    gastoFixo: 'Spesa fissa',
    gastoVariavel: 'Spesa variabile',
    investimento: 'Investimento',
    fundoEmergenciaCategoria: 'Fondo di emergenza',
    pagamentoDivida: 'Pagamento debito',
    periodo: 'Periodo',
    selecionePeriodo: 'Seleziona il periodo di visualizzazione',
    todos: 'Tutti',
    mesAtual: 'Mese corrente',
    mesPassado: 'Mese scorso',
    ultimos3Meses: 'Ultimi 3 mesi',
    ultimos6Meses: 'Ultimi 6 mesi',
    esteAno: 'Quest\'Anno',
    mesEspecifico: 'Mese specifico',
    selecioneMes: 'Seleziona il mese desiderato:',
    exportarCSV: 'Esporta CSV',
    totalEntradas: 'Totale entrate',
    totalSaidas: 'Totale uscite',
    saldo: 'Saldo',
    lancamentosText: 'transazioni',
    todosLancamentos: 'Tutte le transazioni',
    diferencaEntradasSaidas: 'Differenza tra entrate e uscite',
    nenhumLancamentoPeriodo: 'Nessuna transazione trovata per il periodo selezionato.',
    calculadoraPrimeiroMilhao: 'Calcolatore primo milione',
    parametros: 'Parametri',
    preenchaParaCalcular: 'Compila i valori per calcolare il tuo investimento mensile',
    valorInicial: 'Importo iniziale',
    valorFuturoDesejado: 'Valore futuro desiderato',
    taxaJurosAnual: 'Tasso di interesse annuale (%)',
    periodoAnos: 'Periodo (anni)',
    calcular: 'Calcola',
    resultado: 'Risultato',
    valorInvestirMensalmente: 'Importo da investire mensilmente',
    investimentoMensal: 'Investimento mensile',
    totalInvestido: 'Totale investito',
    totalJuros: 'Totale interessi',
    evolucaoInvestimento: 'Evoluzione investimento',
    projecaoMesAMes: 'Proiezione mese per mese',
    mes: 'Mese',
    jurosMes: 'Interessi mensili',
    totalAcumulado: 'Totale accumulato',
    preenchaCliqueCalcular: 'Compila i campi e clicca calcola',
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
    welcomeToPlanner: 'Benvenuto nel pianificatore',
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

    // Redesign
    visaoGeral: 'Panoramica',
    esteMes: 'Questo mese',
    investidoNoMes: 'Investito e accantonato',
    daRenda: 'del reddito',
    fluxoCaixa: 'Flusso di cassa',
    fluxoCaixaDesc: 'Entrate e spese per mese',
    evolucaoPatrimonio: 'Patrimonio nel tempo',
    paraOndeFoi: 'Dove sono finiti i soldi',
    ultimosLancamentos: 'Transazioni recenti',
    verTodos: 'Vedi tutte le transazioni',
    buscar: 'Cerca transazioni',
    todasCategorias: 'Tutte le categorie',
    excluir: 'Elimina',
    excluirLancamento: 'Elimina transazione',
    excluirDescricao: 'Viene rimossa dallo storico e dai totali.',
    editar: 'Modifica',
    nenhumResultado: 'Nessuna transazione corrisponde a questi filtri.',
    limparFiltros: 'Azzera filtri',
    porCategoria: 'Uscite per categoria',
    idioma: 'Lingua',
    tema: 'Tema',
    claro: 'Chiaro',
    escuro: 'Scuro',
    abrirMenu: 'Apri menu',
    atualizarTaxas: 'Aggiorna i tassi di cambio',
    descricaoPlaceholder: 'Stipendio, affitto, spesa',
    camposObrigatorios: 'Inserisci una descrizione e un importo.',
    ano: 'Anno',
    juros: 'Interessi',
    liquido: 'Netto',
    porMes: 'al mese',
    preferencias: 'Preferenze',
    heroTitulo: 'Un pianificatore finanziario personale per chi è stanco dei fogli di calcolo',
    heroTexto: 'Registra entrate, bollette e investimenti mese per mese. Planner calcola il tuo patrimonio, il tuo avanzo mensile e quanti mesi copre il tuo fondo di emergenza, in 5 valute.',
    experimentarConvidado: 'Provalo come ospite',
    metaInvalida: 'Inserisci un obiettivo superiore all\'importo iniziale e un periodo di almeno un anno.',
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

    // Redesign
    visaoGeral: 'Übersicht',
    esteMes: 'Dieser Monat',
    investidoNoMes: 'Investiert und zurückgelegt',
    daRenda: 'des Einkommens',
    fluxoCaixa: 'Cashflow',
    fluxoCaixaDesc: 'Einnahmen und Ausgaben pro Monat',
    evolucaoPatrimonio: 'Vermögen im Zeitverlauf',
    paraOndeFoi: 'Wohin das Geld floss',
    ultimosLancamentos: 'Letzte Buchungen',
    verTodos: 'Alle Buchungen ansehen',
    buscar: 'Buchungen suchen',
    todasCategorias: 'Alle Kategorien',
    excluir: 'Löschen',
    excluirLancamento: 'Buchung löschen',
    excluirDescricao: 'Sie wird aus dem Verlauf und den Summen entfernt.',
    editar: 'Bearbeiten',
    nenhumResultado: 'Keine Buchung passt zu diesen Filtern.',
    limparFiltros: 'Filter zurücksetzen',
    porCategoria: 'Ausgaben nach Kategorie',
    idioma: 'Sprache',
    tema: 'Design',
    claro: 'Hell',
    escuro: 'Dunkel',
    abrirMenu: 'Menü öffnen',
    atualizarTaxas: 'Wechselkurse aktualisieren',
    descricaoPlaceholder: 'Gehalt, Miete, Einkauf',
    camposObrigatorios: 'Bitte Beschreibung und Betrag ausfüllen.',
    ano: 'Jahr',
    juros: 'Zinsen',
    liquido: 'Netto',
    porMes: 'pro Monat',
    preferencias: 'Einstellungen',
    heroTitulo: 'Ein persönlicher Finanzplaner für alle, die genug von Tabellen haben',
    heroTexto: 'Erfasse Einnahmen, Rechnungen und Investitionen pro Monat. Der Planer berechnet dein Vermögen, deinen monatlichen Überschuss und wie viele Monate dein Notgroschen reicht, in 5 Währungen.',
    experimentarConvidado: 'Als Gast ausprobieren',
    metaInvalida: 'Gib ein Ziel über dem Startbetrag und einen Zeitraum von mindestens einem Jahr an.',
  },
};

