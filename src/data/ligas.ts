import type { Liga } from '../types';

export const ligas: Liga[] = [
  {
    id: 'vila-mariana',
    nome: 'Liga Vila Mariana',
    regiao: 'São Paulo · Zona Sul',
    participantes: 184,
    cor: 'iris',
    ranking: [
      { nome: 'Ana P.', pontos: 2140 },
      { nome: 'Rafael M.', pontos: 1985 },
      { nome: 'Você', pontos: 1820, voce: true },
      { nome: 'Juliana S.', pontos: 1700 },
      { nome: 'Carlos E.', pontos: 1610 },
      { nome: 'Beatriz L.', pontos: 1480 },
    ],
  },
  {
    id: 'pinheiros',
    nome: 'Liga Pinheiros',
    regiao: 'São Paulo · Zona Oeste',
    participantes: 152,
    cor: 'orchid',
    ranking: [
      { nome: 'Marina T.', pontos: 2310 },
      { nome: 'Pedro H.', pontos: 2105 },
      { nome: 'Lívia R.', pontos: 1930 },
      { nome: 'Gustavo A.', pontos: 1755 },
      { nome: 'Fernanda C.', pontos: 1590 },
    ],
  },
  {
    id: 'mooca',
    nome: 'Liga Mooca',
    regiao: 'São Paulo · Zona Leste',
    participantes: 197,
    cor: 'periwinkle',
    ranking: [
      { nome: 'Thiago N.', pontos: 2050 },
      { nome: 'Camila F.', pontos: 1990 },
      { nome: 'Bruno K.', pontos: 1870 },
      { nome: 'Isabela V.', pontos: 1660 },
      { nome: 'Diego O.', pontos: 1525 },
    ],
  },
];

export const buscarLiga = (id?: string) => ligas.find((l) => l.id === id);
