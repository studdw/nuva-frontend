import { canvas, corFundo } from '../data/conteudo';
import { BotaoLink, CabecalhoPagina, TituloSecao } from '../components/ui';

const backlog = [
  { epico: 'Validação de missões', historia: 'Quero gravar um vídeo da minha ação e enviá-lo para validação, para receber SoulCoins.', regra: 'Máx. 3 reenvios · vídeo sem rosto é recusado' },
  { epico: 'Conversão de SoulCoins', historia: 'Quero converter meus SoulCoins em desconto na conta de energia, para ter retorno financeiro real.', regra: 'Mínimo 100 SC · 100 SC = R$ 1,00' },
  { epico: 'Ligas comunitárias', historia: 'Quero acompanhar o ranking da minha liga, para comparar meu desempenho com a comunidade.', regra: 'Reinicia toda segunda · 1 liga por usuário' },
  { epico: 'Catálogo de missões', historia: 'Como operador, quero gerenciar as missões, para manter o catálogo adequado à região e à temporada.', regra: '1 missão ativa por dia · critério objetivo' },
];

export default function ModeloNegocio() {
  return (
    <>
      <CabecalhoPagina
        eyebrow="Business Model Canvas"
        titulo={<>Um modelo onde <em className="italic">todos</em> ganham</>}
        texto="O usuário economiza, a concessionária fideliza e a cidade recicla mais. Veja como a NUVA se sustenta."
      />

      <section className="container-page grid gap-3 md:grid-cols-3">
        {canvas.map((b, i) => (
          <article key={b.titulo} className={b.cor ? `card-feature min-h-[260px] ${corFundo[b.cor]}` : 'card min-h-[260px]'}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${b.cor ? 'opacity-70' : 'text-fog'}`}>{String(i + 1).padStart(2, '0')}</p>
            <h2 className={`mt-10 font-titulo text-[30px] font-light leading-none ${b.cor ? '' : 'text-cloud'}`}>{b.titulo}</h2>
            <p className={`mt-4 text-sm leading-relaxed ${b.cor ? 'opacity-85' : ''}`}>{b.texto}</p>
          </article>
        ))}
      </section>

      <section className="mt-[100px] bg-abyss py-[100px]">
        <div className="container-page">
          <TituloSecao rotulo="Backlog do produto" titulo={<>Do canvas ao <em className="italic">código</em></>} />
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {backlog.map((b) => (
              <div key={b.epico} className="grid gap-3 py-8 md:grid-cols-[1fr_2fr_1.2fr] md:items-baseline md:gap-8">
                <h3 className="font-titulo text-2xl font-light text-cloud">{b.epico}</h3>
                <p className="text-sm leading-relaxed">{b.historia}</p>
                <p className="mono text-[10px] text-pure">{b.regra}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-[100px] text-center">
        <div className="card-feature bg-silver px-8 py-16 text-void">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-void/60">Pitch da solução</p>
          <p className="mx-auto mt-6 max-w-2xl font-titulo text-[36px] font-light leading-tight md:text-[48px]">Assista ao pitch da NUVA em vídeo</p>
          <a href="https://youtu.be/ApZ-sgT1jLw" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 rounded-lg bg-void px-[18px] py-3 text-pure transition hover:bg-graphite">
            Ver no YouTube →
          </a>
        </div>
        <div className="mt-10"><BotaoLink to="/sobre" variante="fantasma">Voltar para Sobre</BotaoLink></div>
      </section>
    </>
  );
}
