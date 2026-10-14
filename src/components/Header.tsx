import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCarteira } from '../context/CarteiraContext';

const links = [
  { para: '/', texto: 'Home' },
  { para: '/sobre', texto: 'Sobre' },
  { para: '/missoes', texto: 'Missões' },
  { para: '/ligas', texto: 'Ligas' },
  { para: '/integrantes', texto: 'Integrantes' },
  { para: '/faq', texto: 'FAQ' },
  { para: '/contato', texto: 'Contato' },
];

export default function Header() {
  // useState numero 1: controla o menu hamburguer no celular
  const [menuAberto, setMenuAberto] = useState(false);
  const { saldo } = useCarteira();

  // classe do link muda quando a rota esta ativa
  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm transition duration-200 ${
      isActive ? 'bg-white/10 text-pure' : 'text-ash hover:bg-white/[0.06] hover:text-pure'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-[24px]">
      <div className="container-page flex h-[68px] items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2 text-pure" onClick={() => setMenuAberto(false)}>
          <span className="font-titulo text-[28px] font-light leading-none tracking-tight">NUVA</span>
          <span className="mono hidden text-[10px] text-fog sm:inline">Guardiões da Luz</span>
        </Link>

        {/* menu do desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink key={link.para} to={link.para} className={classeLink} end={link.para === '/'}>
              {link.texto}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/carteira"
            className="hidden items-center gap-2 rounded-lg border border-white/80 bg-white/10 px-3 py-[9px] font-mono text-xs text-pure transition hover:bg-white/20 sm:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            {saldo.toLocaleString('pt-BR')} SC
          </Link>

          {/* botao hamburguer, so aparece no mobile */}
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            className="rounded-lg border border-white/30 px-3 py-2 text-pure lg:hidden"
          >
            <span className="block text-lg leading-none">{menuAberto ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* menu do mobile: so renderiza se estiver aberto */}
      {menuAberto && (
        <nav className="container-page flex flex-col gap-1 border-t border-white/10 pb-5 pt-3 lg:hidden">
          {[...links, { para: '/carteira', texto: `Carteira · ${saldo.toLocaleString('pt-BR')} SC` }].map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              end={link.para === '/'}
              onClick={() => setMenuAberto(false)} // fecha o menu ao navegar
              className={classeLink}
            >
              {link.texto}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
