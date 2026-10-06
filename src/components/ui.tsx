import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const Seta = () => <span aria-hidden>→</span>;

export function BotaoLink({ to, children, variante = 'primario' }: { to: string; children: ReactNode; variante?: 'primario' | 'fantasma' }) {
  return (
    <Link to={to} className={variante === 'primario' ? 'btn-primario' : 'btn-fantasma'}>
      {children} <Seta />
    </Link>
  );
}

export function CabecalhoPagina({ eyebrow, titulo, texto }: { eyebrow: string; titulo: ReactNode; texto?: string }) {
  return (
    <section className="container-page pb-16 pt-24 text-center md:pt-32">
      <span className="eyebrow revelar">{eyebrow}</span>
      <h1 className="display revelar-2 mx-auto mt-8 max-w-4xl text-[52px] md:text-[80px]">{titulo}</h1>
      {texto && <p className="subhead revelar-3 mx-auto mt-6 max-w-[560px]">{texto}</p>}
    </section>
  );
}

export function TituloSecao({ rotulo, titulo, centro = false }: { rotulo: string; titulo: ReactNode; centro?: boolean }) {
  return (
    <div className={centro ? 'text-center' : ''}>
      <p className="mono text-fog">{rotulo}</p>
      <h2 className="display mt-4 text-[38px] md:text-[56px]">{titulo}</h2>
    </div>
  );
}

export function Aviso({ texto, tipo = 'info' }: { texto: string; tipo?: 'info' | 'erro' | 'sucesso' }) {
  const ponto = tipo === 'erro' ? 'bg-orchid' : tipo === 'sucesso' ? 'bg-cyan' : 'bg-pure';
  return (
    <div role="status" className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-cloud">
      <span className={`h-2 w-2 shrink-0 rounded-full ${ponto}`} />
      {texto}
    </div>
  );
}
