export type Integrante = {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  papel: string;
};

export type CorCategoria = 'iris' | 'orchid' | 'periwinkle' | 'pale-iris' | 'deep-iris' | 'cyan';

// ----- tipos espelhando os JSON da API Java -----
export type Missao = {
  id: number;
  titulo: string;
  categoria: string;
  cor: CorCategoria;
  recompensa: number;
  duracao: string;
  dificuldade: 'Fácil' | 'Média' | 'Desafiadora';
  resumo: string;
  passos: string[];
  criterio: string;
  impacto: string;
  ativa: boolean;
};

export type Liga = {
  id: number;
  nome: string;
  regiao: string;
  maxParticipantes: number;
  participantes: number;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  ligaId: number | null;
  saldo: number;
  pontosSemana: number;
  dataCadastro: string;
};

export type Validacao = {
  id: number;
  usuarioId: number;
  missaoId: number;
  nomeArquivo: string;
  rostoVisivel: boolean;
  status: 'VALIDADO' | 'RECUSADO';
  mensagem: string;
  dataEnvio: string;
};

export type Conversao = {
  id: number;
  usuarioId: number;
  coins: number;
  valorDesconto: number;
  data: string;
};

export type Carteira = {
  usuarioId: number;
  saldo: number;
  saldoEmReais: number;
  conversoes: Conversao[];
};

export type Contato = {
  id?: number;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};
