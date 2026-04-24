export type Perfil = "ADMINISTRADOR" | "ADVOGADO" | "CLIENTE";

export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  oab?: string;
  senha?: string;
  cpf?: string;
  cargo?: string;
  whatsapp?: string;
}

export interface Processo {
  id: string;
  numero: string;
  titulo: string;
  status: "Em Andamento" | "Aguardando Audiencia" | "Sentenciado" | "Arquivado" | "Recurso";
  descricao: string;
  vara: string;
  tribunal: string;
  advogadoId: string;
  clienteId: string;
  advogadoNome: string;
  clienteNome: string;
  dataAbertura: string;
}

export interface Movimentacao {
  id: string;
  processoId: string;
  data: string;
  tipo: string;
  textoOriginal: string;
  textoTraduzido: string;
}

export const mockUsers: User[] = [
  {
    id: "0",
    nome: "Administrador do Sistema",
    email: "admin@sistema.com",
    perfil: "ADMINISTRADOR",
    senha: "admin123",
  },
  {
    id: "1",
    nome: "Dr. Carlos Mendes",
    email: "carlos@advogado.com",
    perfil: "ADVOGADO",
    oab: "OAB/SP 123456",
  },
  {
    id: "2",
    nome: "Maria Silva",
    email: "maria@cliente.com",
    perfil: "CLIENTE",
  },
];

export const mockProcessos: Processo[] = [
  {
    id: "p1",
    numero: "1001234-56.2024.8.26.0100",
    titulo: "Ação de Indenização por Danos Morais",
    status: "Em Andamento",
    descricao: "Ação movida contra a companhia de energia elétrica por cortes recorrentes e queima de aparelhos.",
    vara: "3ª Vara Cível",
    tribunal: "TJSP - Foro Central Cível",
    advogadoId: "1",
    clienteId: "2",
    advogadoNome: "Dr. Carlos Mendes",
    clienteNome: "Maria Silva",
    dataAbertura: "2024-01-15T10:00:00Z",
  },
  {
    id: "p2",
    numero: "1005678-12.2023.8.26.0100",
    titulo: "Ação Revisional de Contrato Bancário",
    status: "Aguardando Audiencia",
    descricao: "Revisão de juros abusivos em financiamento de veículo.",
    vara: "5ª Vara Cível",
    tribunal: "TJSP - Foro Central Cível",
    advogadoId: "1",
    clienteId: "2",
    advogadoNome: "Dr. Carlos Mendes",
    clienteNome: "Maria Silva",
    dataAbertura: "2023-11-20T14:30:00Z",
  },
  {
    id: "p3",
    numero: "0023456-89.2022.8.26.0002",
    titulo: "Divórcio Litigioso c/c Partilha de Bens",
    status: "Sentenciado",
    descricao: "Ação de divórcio com partilha de bens e definição de guarda.",
    vara: "2ª Vara da Família e Sucessões",
    tribunal: "TJSP - Foro Regional II Santo Amaro",
    advogadoId: "1",
    clienteId: "3", // Other client
    advogadoNome: "Dr. Carlos Mendes",
    clienteNome: "João Almeida",
    dataAbertura: "2022-05-10T09:15:00Z",
  },
  {
    id: "p4",
    numero: "1018901-45.2024.8.26.0100",
    titulo: "Ação de Despejo por Falta de Pagamento",
    status: "Recurso",
    descricao: "Despejo por falta de pagamento de aluguéis e encargos locatícios.",
    vara: "10ª Vara Cível",
    tribunal: "TJSP - Foro Central Cível",
    advogadoId: "1",
    clienteId: "2",
    advogadoNome: "Dr. Carlos Mendes",
    clienteNome: "Maria Silva",
    dataAbertura: "2024-03-05T11:45:00Z",
  },
  {
    id: "p5",
    numero: "0009876-54.2021.8.26.0053",
    titulo: "Ação Trabalhista - Horas Extras e Rescisão",
    status: "Arquivado",
    descricao: "Reclamação trabalhista pleiteando horas extras não pagas e verbas rescisórias.",
    vara: "15ª Vara do Trabalho de São Paulo",
    tribunal: "TRT-2 - São Paulo",
    advogadoId: "1",
    clienteId: "4",
    advogadoNome: "Dr. Carlos Mendes",
    clienteNome: "Roberto Ferreira",
    dataAbertura: "2021-08-22T08:30:00Z",
  }
];

export const mockMovimentacoes: Movimentacao[] = [
  // Process 1 (p1)
  {
    id: "m1",
    processoId: "p1",
    data: "2024-01-16T14:00:00Z",
    tipo: "Distribuição",
    textoOriginal: "Processo distribuído livremente para a 3ª Vara Cível.",
    textoTraduzido: "O processo foi recebido pelo tribunal e sorteado para o juiz da 3ª Vara Cível cuidar do caso.",
  },
  {
    id: "m2",
    processoId: "p1",
    data: "2024-01-20T10:30:00Z",
    tipo: "Despacho",
    textoOriginal: "Despacho: Cite-se o réu por mandado para apresentar defesa no prazo legal, sob pena de revelia.",
    textoTraduzido: "O juiz ordenou que a empresa seja oficialmente notificada sobre o processo por um oficial de justiça. Ela tem um prazo para se defender, senão será considerado que aceitou suas acusações.",
  },
  {
    id: "m3",
    processoId: "p1",
    data: "2024-02-15T16:45:00Z",
    tipo: "Juntada de Petição",
    textoOriginal: "Juntada de Contestação com documentos apresentada pela parte requerida.",
    textoTraduzido: "A empresa de energia apresentou a defesa dela junto com os documentos que achou necessários.",
  },
  {
    id: "m4",
    processoId: "p1",
    data: "2024-03-01T09:00:00Z",
    tipo: "Ato Ordinatório",
    textoOriginal: "Ato ordinatório: Manifeste-se o autor em réplica à contestação.",
    textoTraduzido: "O cartório está pedindo que nós, seus advogados, respondamos à defesa que a empresa apresentou.",
  },
  {
    id: "m5",
    processoId: "p1",
    data: "2024-04-10T11:20:00Z",
    tipo: "Conclusão",
    textoOriginal: "Autos conclusos para prolação de sentença.",
    textoTraduzido: "O processo foi encaminhado ao juiz para que ele escreva a decisão final do caso.",
  },
  
  // Process 2 (p2)
  {
    id: "m6",
    processoId: "p2",
    data: "2023-11-25T15:00:00Z",
    tipo: "Despacho",
    textoOriginal: "Despacho: Designo audiência de conciliação para o dia 15/05/2024 às 14:00. Citem-se e intimem-se.",
    textoTraduzido: "O juiz marcou uma reunião (audiência de conciliação) para tentar um acordo com o banco no dia 15/05/2024. Todos serão avisados.",
  },
  {
    id: "m7",
    processoId: "p2",
    data: "2023-12-05T10:00:00Z",
    tipo: "Certidão",
    textoOriginal: "Certifico e dou fé que o mandado de citação foi cumprido positivamente.",
    textoTraduzido: "O oficial de justiça confirmou que entregou a notificação do processo ao banco.",
  },
  {
    id: "m8",
    processoId: "p2",
    data: "2024-05-15T15:30:00Z",
    tipo: "Termo de Audiência",
    textoOriginal: "Audiência de conciliação infrutífera. Prazo para contestação em curso.",
    textoTraduzido: "Não houve acordo na reunião com o banco. Agora o banco tem um prazo para apresentar a defesa dele.",
  },
  {
    id: "m9",
    processoId: "p2",
    data: "2024-06-02T14:15:00Z",
    tipo: "Juntada",
    textoOriginal: "Juntada de contestação tempestiva pela parte ré.",
    textoTraduzido: "O banco apresentou a defesa dele dentro do prazo correto.",
  },

  // Process 3 (p3)
  {
    id: "m10",
    processoId: "p3",
    data: "2022-05-12T09:00:00Z",
    tipo: "Distribuição",
    textoOriginal: "Processo distribuído livremente.",
    textoTraduzido: "O processo foi recebido e direcionado para a 2ª Vara da Família.",
  },
  {
    id: "m11",
    processoId: "p3",
    data: "2022-06-10T14:30:00Z",
    tipo: "Despacho",
    textoOriginal: "Fixo alimentos provisórios em 30% do salário mínimo. Cite-se.",
    textoTraduzido: "O juiz determinou o pagamento inicial de pensão alimentícia (30% do salário mínimo) e mandou notificar a outra parte.",
  },
  {
    id: "m12",
    processoId: "p3",
    data: "2022-10-20T16:00:00Z",
    tipo: "Sentença",
    textoOriginal: "Julgo procedente em parte o pedido, decretando o divórcio das partes e partilhando os bens na proporção de 50%.",
    textoTraduzido: "O juiz decidiu oficializar o divórcio e dividir os bens pela metade para cada um.",
  },
  {
    id: "m13",
    processoId: "p3",
    data: "2022-11-15T11:00:00Z",
    tipo: "Trânsito em Julgado",
    textoOriginal: "Certifico o trânsito em julgado da sentença proferida.",
    textoTraduzido: "A decisão do juiz tornou-se definitiva, pois nenhuma das partes recorreu no prazo.",
  },

  // Process 4 (p4)
  {
    id: "m14",
    processoId: "p4",
    data: "2024-03-08T10:15:00Z",
    tipo: "Despacho",
    textoOriginal: "Defiro a liminar de despejo, condicionada à prestação de caução equivalente a 3 meses de aluguel.",
    textoTraduzido: "O juiz autorizou o despejo imediato, mas exigiu que a imobiliária deposite o valor de 3 meses de aluguel como garantia.",
  },
  {
    id: "m15",
    processoId: "p4",
    data: "2024-03-15T14:00:00Z",
    tipo: "Juntada",
    textoOriginal: "Comprovante de depósito judicial juntado aos autos.",
    textoTraduzido: "A imobiliária apresentou o comprovante de que depositou o valor da garantia exigido pelo juiz.",
  },
  {
    id: "m16",
    processoId: "p4",
    data: "2024-04-02T16:30:00Z",
    tipo: "Mandado",
    textoOriginal: "Expedição de mandado de citação e despejo.",
    textoTraduzido: "Foi emitido o documento oficial para que o oficial de justiça notifique sobre o processo e realize o despejo.",
  },
  {
    id: "m17",
    processoId: "p4",
    data: "2024-04-20T09:00:00Z",
    tipo: "Recurso",
    textoOriginal: "Interposição de Agravo de Instrumento com pedido de efeito suspensivo pela parte ré.",
    textoTraduzido: "A inquilina (ré) recorreu da decisão do juiz em uma instância superior e pediu para suspender o despejo temporariamente.",
  }
];