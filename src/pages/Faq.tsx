import { useState } from 'react';
import { faq } from '../data/conteudo';
import { BotaoLink, CabecalhoPagina } from '../components/ui';

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <>
      <CabecalhoPagina eyebrow="Perguntas frequentes" titulo={<>Tudo sobre a <em className="italic">NUVA</em></>} />
      <section className="container-page max-w-[880px]">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faq.map((f, i) => {
            const open = aberta === i;
            return (
              <div key={f.p}>
                <button onClick={() => setAberta(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-7 text-left">
                  <span className="font-titulo text-[24px] font-light text-cloud md:text-[28px]">{f.p}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 text-pure transition duration-200 ${open ? 'rotate-45 bg-white/10' : ''}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden pr-14 leading-relaxed">{f.r}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <p className="subhead">Não encontrou sua resposta?</p>
          <div className="mt-6"><BotaoLink to="/contato">Fale com a gente</BotaoLink></div>
        </div>
      </section>
    </>
  );
}
