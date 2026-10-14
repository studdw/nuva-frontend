import type { CorCategoria } from '../types';

export const corFundo: Record<CorCategoria, string> = {
  iris: 'bg-iris text-pure',
  orchid: 'bg-orchid text-void',
  periwinkle: 'bg-periwinkle text-void',
  'pale-iris': 'bg-pale-iris text-void',
  'deep-iris': 'bg-deep-iris text-pure',
  cyan: 'bg-cyan text-void',
};

/** Cores alternadas para as ligas (a API não guarda cor de liga). */
export const corDaLiga = (indice: number): CorCategoria =>
  (['iris', 'orchid', 'periwinkle', 'pale-iris', 'deep-iris'] as CorCategoria[])[indice % 5];

export const faq = [
  { p: 'O que é a NUVA?', r: 'Uma plataforma de gamificação que distribui missões sustentáveis diárias, valida a execução por vídeo com inteligência artificial e converte os pontos em desconto real na conta de energia.' },
  { p: 'Quanto vale um SoulCoin?', r: 'A taxa é fixa: 100 SoulCoins equivalem a R$ 1,00 de desconto na fatura. A conversão mínima é de 100 SoulCoins.' },
  { p: 'Como a IA valida a minha missão?', r: 'Você grava um vídeo de até 30 segundos (MP4 ou MOV) com o rosto visível. A IA analisa o vídeo e devolve o resultado em até 60 segundos: validado ou recusado.' },
  { p: 'E se meu vídeo for recusado?', r: 'Você pode reenviar até 3 vezes por missão. Vídeos sem rosto visível são recusados automaticamente, então siga as dicas mostradas antes da gravação.' },
  { p: 'Como funcionam as ligas?', r: 'Cada usuário participa de uma liga definida pela localização cadastrada. O ranking é semanal, reinicia toda segunda-feira e comporta até 200 participantes.' },
  { p: 'Em quanto tempo o desconto chega na conta?', r: 'A conversão é processada em até 24 horas e aplicada na próxima fatura do titular da conta cadastrada na concessionária parceira.' },
  { p: 'O que acontece com os meus vídeos?', r: 'Em conformidade com a LGPD, os vídeos ficam armazenados por no máximo 30 dias e são usados somente para validar a missão.' },
];

export const canvas: { titulo: string; texto: string; cor?: CorCategoria }[] = [
  { titulo: 'Parcerias-chave', texto: 'Concessionárias de energia, prefeituras e programas municipais de sustentabilidade, cooperativas locais de reciclagem.' },
  { titulo: 'Atividades-chave', texto: 'Validação de missões por IA, curadoria do catálogo de missões, negociação de créditos com concessionárias e gestão das ligas comunitárias.' },
  { titulo: 'Recursos principais', texto: 'Modelo de visão computacional para validar vídeos, base de usuários organizada em ligas e integração com o faturamento das concessionárias.' },
  { titulo: 'Proposta de valor', texto: 'Converter ações sustentáveis comprovadas em desconto real na conta de energia, com validação por IA e competição comunitária.', cor: 'iris' },
  { titulo: 'Relacionamento', texto: 'Gamificação com missões e SoulCoins, comunidade por meio das ligas, suporte via FAQ e formulário de contato.' },
  { titulo: 'Canais', texto: 'Aplicativo e site da NUVA, parcerias com concessionárias de energia e redes sociais.' },
  { titulo: 'Segmentos de clientes', texto: 'Moradores urbanos com conta de energia própria, engajados ou dispostos a se engajar em práticas sustentáveis.', cor: 'orchid' },
  { titulo: 'Estrutura de custos', texto: 'Infraestrutura de IA para validação de vídeo, operação da plataforma, aquisição de usuários e custo do desconto nas contas.' },
  { titulo: 'Fontes de receita', texto: 'Parceria comercial com concessionárias, patrocínio de prefeituras ou empresas às ligas e espaço publicitário de marcas sustentáveis.', cor: 'periwinkle' },
];
