import { Link, Navigate, useParams } from 'react-router-dom';
import { integrantes } from '../data/integrantes';
import { IconeGithub, IconeLinkedin } from '../components/Icones';

export default function IntegranteDetalhe() {
  const { rm } = useParams<{ rm: string }>();
  const p = integrantes.find((i) => i.rm === rm);

  if (!p) {
    return <Navigate to="/integrantes" replace state={{ mensagem: `Nenhum integrante com RM ${rm}. Confira a equipe abaixo.` }} />;
  }

  const outros = integrantes.filter((i) => i.rm !== rm);

  return (
    <section className="container-page pt-16">
      <Link to="/integrantes" className="mono text-fog transition hover:text-pure">← Equipe</Link>
      <div className="mt-10 grid items-center gap-12 rounded-[16px] bg-graphite p-6 md:grid-cols-[360px_1fr] md:p-[60px]">
        <img src={p.foto} alt={`Foto de ${p.nome}`} referrerPolicy="no-referrer" className="aspect-square w-full rounded-[16px] object-cover" />
        <div>
          <span className="eyebrow">RM {p.rm} · {p.turma}</span>
          <h1 className="display mt-8 text-[52px] md:text-[80px]">{p.nome}</h1>
          <p className="subhead mt-4">{p.papel} · NUVA — Guardiões da Luz</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={p.github} target="_blank" rel="noreferrer" className="btn-primario"><IconeGithub /> GitHub</a>
            <a href={p.linkedin} target="_blank" rel="noreferrer" className="btn-fantasma"><IconeLinkedin /> LinkedIn</a>
          </div>
        </div>
      </div>
      <p className="mono mt-16 text-fog">Outros integrantes</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {outros.map((o) => (
          <Link key={o.rm} to={`/integrantes/${o.rm}`} className="flex items-center gap-3 rounded-full border border-white/15 py-1.5 pl-1.5 pr-5 text-sm text-cloud transition hover:bg-white/10">
            <img src={o.foto} alt="" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full object-cover" />
            {o.nome}
          </Link>
        ))}
      </div>
    </section>
  );
}
