import type { Carteira, Contato, Conversao, Liga, Missao, Usuario, Validacao } from '../types';

const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');

/** Usuário de demonstração (cadastrado no scripts.sql da API). */
export const USUARIO_ID = 1;

/** Erro com o status HTTP e a mensagem enviada pelo GlobalExceptionHandler da API. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response;
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      ...opcoes,
      headers: { 'Content-Type': 'application/json', ...opcoes.headers },
    });
  } catch {
    throw new ApiError(0, 'Não foi possível conectar à API. Ela pode estar iniciando — tente novamente em alguns segundos.');
  }

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new ApiError(resposta.status, corpo?.mensagem ?? `Erro ${resposta.status}`);
  }
  return resposta.status === 204 ? (undefined as T) : resposta.json();
}

const enviar = <T>(metodo: string, caminho: string, corpo?: unknown) =>
  requisicao<T>(caminho, { method: metodo, body: corpo === undefined ? undefined : JSON.stringify(corpo) });

export const api = {
  // Missões
  listarMissoes: () => requisicao<Missao[]>('/missoes'),
  buscarMissao: (id: number) => requisicao<Missao>(`/missoes/${id}`),

  // Ligas
  listarLigas: () => requisicao<Liga[]>('/ligas'),
  buscarLiga: (id: number) => requisicao<Liga>(`/ligas/${id}`),
  rankingLiga: (id: number) => requisicao<Usuario[]>(`/ligas/${id}/ranking`),

  // Usuário / carteira
  buscarUsuario: (id: number) => requisicao<Usuario>(`/usuarios/${id}`),
  atualizarUsuario: (id: number, dados: Pick<Usuario, 'nome' | 'email' | 'ligaId'>) =>
    enviar<Usuario>('PUT', `/usuarios/${id}`, dados),
  carteira: (id: number) => requisicao<Carteira>(`/usuarios/${id}/carteira`),
  validacoesDoUsuario: (id: number) => requisicao<Validacao[]>(`/usuarios/${id}/validacoes`),

  // Validação da missão
  enviarValidacao: (dados: { usuarioId: number; missaoId: number; nomeArquivo: string; rostoVisivel: boolean }) =>
    enviar<Validacao>('POST', '/validacoes', dados),

  // Conversões
  converter: (usuarioId: number, coins: number) => enviar<Conversao>('POST', '/conversoes', { usuarioId, coins }),
  cancelarConversao: (id: number) => enviar<void>('DELETE', `/conversoes/${id}`),

  // Contato
  enviarContato: (contato: Contato) => enviar<Contato>('POST', '/contatos', contato),
};
