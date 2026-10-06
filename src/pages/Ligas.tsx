import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useApi } from '../hooks/useApi';
import { corDaLiga, corFundo } from '../data/conteudo';
import { useCarteira } from '../context/CarteiraContext';
import { CabecalhoPagina, Seta } from '../components/ui';
import { Carregando, ErroApi } from '../components/Estado';

export default function Ligas() {
  const { dados: ligas, carregando, erro, recarregar } = useApi(api.listarLigas);
  const { usuario } = useCarteira();

  return (
    <>
      <CabecalhoPagina
        eyebrow="Ranking reinicia toda segunda"
        titulo={<>Ligas <em className="italic">comunitárias</em></>}
        texto="Cada guardião compete com moradores da própria região. Escolha uma liga para ver o ranking da semana."
      />
      <section className="container-page">
        {erro && <ErroApi erro={erro} onTentar={recarregar} />}
        {carregando && <Carregando />}
        <div className="grid gap-3 md:grid-cols-3">
          {ligas?.map((l, i) => (
            <Link key={l.id} to={`/ligas/${l.id}`} className={`card-feature group flex min-h-[300px] flex-col justify-between transition duration-200 hover:-translate-y-1 ${corFundo[corDaLiga(i)]}`}>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">
                <span>{l.regiao}</span>
                {usuario?.ligaId === l.id && <span>Sua liga</span>}
              </div>
              <div>
                <h2 className="font-titulo text-[38px] font-light leading-[0.95]">{l.nome}</h2>
                <p className="mt-4 flex items-center justify-between text-sm opacity-80">
                  <span>{l.participantes} / {l.maxParticipantes} guardiões</span>
                  <Seta />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
