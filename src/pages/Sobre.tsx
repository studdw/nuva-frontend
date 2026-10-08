import { CabecalhoPagina, TituloSecao, BotaoLink } from '../components/ui';

const dores = [
  { n: '01', t: 'Sem retorno financeiro', d: 'Apps de sustentabilidade dão selos e pontos simbólicos que não viram dinheiro.' },
  { n: '02', t: 'Sem validação real', d: 'Quem só declara uma ação recebe o mesmo tratamento de quem a realizou de fato.' },
  { n: '03', t: 'Sem comunidade', d: 'Baixo senso de pertencimento reduz o motivo para manter o hábito no médio prazo.' },
];

const solucoes = [
  { cor: 'bg-iris text-pure', t: 'Recompensa financeira', d: 'SoulCoins convertidos em desconto real na conta de energia.' },
  { cor: 'bg-pale-iris text-void', t: 'Validação por IA', d: 'Vídeo curto com rosto visível elimina a autodeclaração.' },
  { cor: 'bg-orchid text-void', t: 'Ligas comunitárias', d: 'Competição semanal com moradores da sua região.' },
];

const heuristicas = [
  { tela: 'Missão do dia', h: 'Visibilidade do status do sistema', d: 'Progresso e pontos da semana sempre à vista.' },
  { tela: 'Registrar missão', h: 'Prevenção de erros', d: 'Dicas exibidas antes da gravação evitam vídeos recusados pela IA.' },
  { tela: 'Ranking da liga', h: 'Reconhecimento em vez de memorização', d: 'A posição do usuário fica destacada na lista.' },
];

export default function Sobre() {
  return (
    <>
      <CabecalhoPagina
        eyebrow="Sobre o projeto"
        titulo={<>Sustentabilidade que <em className="italic">compensa</em></>}
        texto="A NUVA — Guardiões da Luz nasceu para dar retorno concreto a quem já pratica pequenas ações sustentáveis no dia a dia."
      />

      <section className="bg-abyss py-[100px]">
        <div className="container-page">
          <TituloSecao rotulo="A oportunidade" titulo={<>O problema que <em className="italic">ninguém</em> resolve</>} />
          <p className="subhead mt-6 max-w-2xl">
            Moradores urbanos com conta de energia própria separam recicláveis, economizam água e usam transporte alternativo — mas não enxergam vantagem financeira nisso.
          </p>
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {dores.map((d) => (
              <div key={d.n} className="card">
                <p className="font-mono text-xs text-fog">{d.n}</p>
                <h3 className="mt-8 font-titulo text-[28px] font-light text-cloud">{d.t}</h3>
                <p className="mt-3 text-sm leading-relaxed">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-[100px]">
        <TituloSecao rotulo="A solução" titulo={<>Missão, vídeo, <em className="italic">crédito</em></>} />
        <p className="subhead mt-6 max-w-2xl">
          O usuário recebe uma missão diária, realiza a ação, grava um vídeo curto com o rosto visível e, se aprovado pela IA, recebe SoulCoins conversíveis em crédito na fatura.
        </p>
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {solucoes.map((s) => (
            <div key={s.t} className={`card-feature flex min-h-[260px] flex-col justify-end ${s.cor}`}>
              <h3 className="font-titulo text-[34px] font-light leading-[0.95]">{s.t}</h3>
              <p className="mt-4 opacity-80">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page">
        <TituloSecao rotulo="Protótipo · Heurísticas de Nielsen" titulo={<>Desenhado para <em className="italic">clareza</em></>} />
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {heuristicas.map((h) => (
            <div key={h.tela} className="grid gap-3 py-8 md:grid-cols-[1fr_1.2fr_1.6fr] md:items-baseline">
              <p className="font-titulo text-2xl font-light text-cloud">{h.tela}</p>
              <p className="mono text-pure">{h.h}</p>
              <p className="text-sm leading-relaxed">{h.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <BotaoLink to="/missoes">Ver missões</BotaoLink>
          <BotaoLink to="/modelo-de-negocio" variante="fantasma">Modelo de negócio</BotaoLink>
        </div>
      </section>
    </>
  );
}
