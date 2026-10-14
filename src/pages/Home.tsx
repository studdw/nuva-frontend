import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import { corFundo } from '../data/conteudo';
import { useCarteira, emReais } from '../context/CarteiraContext';
import Celular from '../components/Celular';
import { BotaoLink, Seta, TituloSecao } from '../components/ui';

const modulos = [
  { cor: 'bg-iris text-pure', rotulo: '01 · Missões', titulo: 'Uma missão por dia', texto: 'Ações curtas, personalizadas pela sua região e histórico.', para: '/missoes' },
  { cor: 'bg-orchid text-void', rotulo: '02 · Ligas', titulo: 'Sua rua compete', texto: 'Ranking semanal com quem mora perto de você.', para: '/ligas' },
  { cor: 'bg-periwinkle text-void', rotulo: '03 · Carteira', titulo: 'Coins viram reais', texto: '100 SoulCoins = R$ 1,00 de desconto na fatura.', para: '/carteira' },
];

const passos = [
  { n: '01', t: 'Receba', d: 'Uma missão sustentável chega todos os dias.' },
  { n: '02', t: 'Realize', d: 'Faça a ação no mundo real — reciclar, economizar, pedalar.' },
  { n: '03', t: 'Comprove', d: 'Grave até 30s com o rosto visível. A IA valida em até 60s.' },
  { n: '04', t: 'Converta', d: 'Troque SoulCoins por desconto na conta de energia.' },
];

export default function Home() {
  const { saldo, usuario } = useCarteira();
  const { dados: missoes } = useApi(api.listarMissoes);
  const destaque = missoes?.[0];

  return (
    <>
      {/* HERO */}
      <section className="ceu relative overflow-hidden">
        <div className="container-page relative pb-28 pt-24 text-center md:pb-40 md:pt-32">
          <span className="eyebrow revelar">Sprint 04 · Plataforma de gamificação sustentável</span>
          <h1 className="display revelar-2 mx-auto mt-10 max-w-5xl text-[56px] md:text-[96px]">
            <em className="italic">Transforme</em> pequenas ações em energia para o futuro
          </h1>
          <p className="revelar-3 mx-auto mt-8 max-w-[560px] text-lg font-light leading-relaxed text-cloud/80">
            Missões diárias validadas por inteligência artificial que viram desconto real na sua conta de luz.
          </p>
          <div className="revelar-3 mt-10 flex flex-wrap justify-center gap-3">
            <BotaoLink to="/missoes">Começar minha missão</BotaoLink>
            <BotaoLink to="/sobre" variante="fantasma">Como funciona</BotaoLink>
          </div>
          <Link
            to="/missoes"
            className="revelar-3 mx-auto mt-14 flex max-w-xl items-center justify-between rounded-lg border border-white/10 bg-void/80 py-2 pl-[22px] pr-2 text-left text-ash backdrop-blur transition hover:border-white/30"
          >
            <span>Qual missão eu faço hoje?</span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/20 text-pure">↑</span>
          </Link>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="bg-abyss">
        <div className="container-page grid grid-cols-2 py-14 md:grid-cols-4">
          {[['100 SC', '= R$ 1,00'], ['≤ 60s', 'validação por IA'], ['200', 'pessoas por liga'], ['24h', 'para converter']].map(([v, r]) => (
            <div key={r} className="px-4 py-4 text-center">
              <p className="display text-[44px] md:text-[56px]">{v}</p>
              <p className="mono mt-3 text-fog">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="container-page py-[100px]">
        <TituloSecao rotulo="A plataforma" titulo={<>Três módulos, <em className="italic">uma</em> recompensa</>} centro />
        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {modulos.map((m) => (
            <Link key={m.titulo} to={m.para} className={`card-feature group flex min-h-[340px] flex-col justify-between transition duration-200 hover:-translate-y-1 ${m.cor}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-70">{m.rotulo}</p>
              <div>
                <h3 className="font-titulo text-[38px] font-light leading-[0.95]">{m.titulo}</h3>
                <p className="mt-4 text-base leading-relaxed opacity-80">{m.texto}</p>
                <p className="mt-6 text-sm opacity-70 transition group-hover:opacity-100">Explorar <Seta /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUTO */}
      <section className="container-page">
        <div className="grid items-center gap-16 rounded-[16px] bg-graphite px-6 py-16 md:grid-cols-2 md:p-[90px]">
          <div>
            <p className="mono text-fog">Missão do dia</p>
            <h2 className="display mt-4 text-[44px] md:text-[64px]">Faça. <em className="italic">Grave.</em> Ganhe.</h2>
            <p className="subhead mt-6 max-w-md">A missão chega pela manhã, a IA confere seu vídeo em segundos e os SoulCoins caem direto na sua carteira.</p>
            <div className="mt-10">
              <BotaoLink to={destaque ? `/missoes/${destaque.id}` : '/missoes'}>Ver missão de hoje</BotaoLink>
            </div>
          </div>

          <Celular>
            <p className="mono text-[10px] text-fog">Bom dia, {usuario?.nome.split(' ')[0] ?? 'Guardião'}</p>
            <p className="mt-2 font-titulo text-3xl font-light text-cloud">{saldo.toLocaleString('pt-BR')} SC</p>
            <p className="font-mono text-[11px] text-cyan">≈ {emReais(saldo)} de desconto</p>
            <svg viewBox="0 0 200 50" className="mt-4 w-full" aria-hidden>
              <polyline fill="none" stroke="#00b3dd" strokeWidth="1.5" points="0,42 25,38 50,40 75,28 100,30 125,20 150,22 175,10 200,6" />
            </svg>
            {destaque ? (
              <div className={`mt-5 rounded-[20px] p-5 ${corFundo[destaque.cor]}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">+{destaque.recompensa} SC</p>
                <p className="mt-3 font-titulo text-xl font-light leading-tight">{destaque.titulo}</p>
              </div>
            ) : (
              <div className="mt-5 h-[110px] animate-pulse rounded-[20px] bg-graphite" />
            )}
            <div className="mt-3 rounded-[16px] bg-graphite p-4">
              <p className="mono text-[10px] text-fog">Pontos da semana</p>
              <p className="mt-1 text-sm text-cloud">{(usuario?.pontosSemana ?? 0).toLocaleString('pt-BR')} pts · encerra em 2d 4h</p>
              <div className="mt-3 h-1 rounded-full bg-steel"><div className="h-1 w-[72%] rounded-full bg-pure" /></div>
            </div>
            <div className="mt-3 rounded-lg bg-pure py-3 text-center text-sm text-void">Registrar ação agora →</div>
          </Celular>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="container-page py-[100px]">
        <TituloSecao rotulo="Como funciona" titulo={<>Do gesto ao <em className="italic">desconto</em></>} />
        <div className="mt-14 grid border-t border-white/10 md:grid-cols-4">
          {passos.map((p) => (
            <div key={p.n} className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <p className="font-mono text-xs text-fog">{p.n}</p>
              <h3 className="mt-6 font-titulo text-[32px] font-light text-cloud">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARD INVERTIDO */}
      <section className="container-page">
        <div className="card-feature bg-silver px-8 py-16 text-center text-void md:px-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-void/60">Por que a NUVA existe</p>
          <p className="mx-auto mt-6 max-w-3xl font-titulo text-[30px] font-light leading-[1.1] md:text-[44px]">
            “Quem já recicla, economiza água e pedala não recebe nada por isso. A gente decidiu mudar essa conta.”
          </p>
          <div className="mt-10">
            <Link to="/modelo-de-negocio" className="inline-flex items-center gap-3 rounded-lg bg-void px-[18px] py-3 text-pure transition hover:bg-graphite">
              Ver modelo de negócio <Seta />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
