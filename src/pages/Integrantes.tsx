import { Link } from 'react-router-dom';
import { integrantes } from '../data/integrantes';
import { CabecalhoPagina, Seta } from '../components/ui';
import { IconeGithub, IconeLinkedin } from '../components/Icones';

export default function Integrantes() {
  return (
    <>
      <CabecalhoPagina eyebrow="Turma 1TDSPV · FIAP" titulo={<>Os <em className="italic">guardiões</em> por trás da luz</>} />
      <section className="container-page grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {integrantes.map((p) => (
          <article key={p.rm} className="card group flex flex-col p-4">
            <Link to={`/integrantes/${p.rm}`} className="block overflow-hidden rounded-[12px]">
              <img src={p.foto} alt={`Foto de ${p.nome}`} loading="lazy" referrerPolicy="no-referrer" className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
            </Link>
            <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
              <p className="mono text-[10px] text-fog">RM {p.rm} · {p.turma}</p>
              <h2 className="mt-3 font-titulo text-[26px] font-light leading-tight text-cloud">{p.nome}</h2>
              <p className="mt-1 text-sm">{p.papel}</p>
              <div className="mt-6 flex items-center gap-2">
                <a href={p.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${p.nome}`} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-pure transition hover:bg-white/10"><IconeGithub /></a>
                <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${p.nome}`} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-pure transition hover:bg-white/10"><IconeLinkedin /></a>
                <Link to={`/integrantes/${p.rm}`} className="ml-auto text-sm text-ash transition hover:text-pure">Perfil <Seta /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
