import { Link } from 'react-router-dom';

const colunas = [
  { titulo: 'Plataforma', links: [{ para: '/missoes', texto: 'Missões' }, { para: '/ligas', texto: 'Ligas' }, { para: '/carteira', texto: 'Carteira' }] },
  { titulo: 'Projeto', links: [{ para: '/sobre', texto: 'Sobre' }, { para: '/modelo-de-negocio', texto: 'Modelo de negócio' }, { para: '/integrantes', texto: 'Integrantes' }] },
  { titulo: 'Ajuda', links: [{ para: '/faq', texto: 'FAQ' }, { para: '/contato', texto: 'Contato' }] },
];

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-[120px] border-t border-white/[0.06] bg-abyss">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="display text-[38px]">Pequenas ações, <em className="italic">luz</em> real.</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Missões sustentáveis validadas por IA que viram desconto na conta de energia.</p>
        </div>
        {colunas.map((c) => (
          <div key={c.titulo}>
            <p className="mono mb-4 text-fog">{c.titulo}</p>
            <ul className="space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.para}><Link to={l.para} className="transition hover:text-pure">{l.texto}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="container-page mono flex flex-col gap-2 py-6 text-[10px] text-fog md:flex-row md:justify-between">
          <p>© {ano} NUVA — Guardiões da Luz</p>
          <p>FIAP · 1TDSPV · Front-End Design Engineering · Sprint 04</p>
        </div>
      </div>
    </footer>
  );
}
