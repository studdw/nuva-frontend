import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { api, ApiError, USUARIO_ID } from '../services/api';
import { useApi } from '../hooks/useApi';
import { useCarteira } from '../context/CarteiraContext';
import { Aviso, Seta } from '../components/ui';
import { ErroApi } from '../components/Estado';

export default function LigaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const ligaId = Number(id);
  const { usuario, atualizar } = useCarteira();

  const { dados: liga, erro } = useApi(() => api.buscarLiga(ligaId), [ligaId]);
  const { dados: ranking, recarregar } = useApi(() => api.rankingLiga(ligaId), [ligaId]);
  const [msg, setMsg] = useState<{ t: string; tipo: 'erro' | 'sucesso' } | null>(null);
  const [salvando, setSalvando] = useState(false);

  if (Number.isNaN(ligaId) || erro?.status === 404) {
    return <Navigate to="/ligas" replace state={{ mensagem: `Não encontramos a liga “${id}”. Veja as ligas disponíveis abaixo.` }} />;
  }
  if (erro) return <section className="container-page pt-16"><ErroApi erro={erro} /></section>;

  const minhaLiga = usuario?.ligaId === ligaId;
  const lider = ranking?.[0]?.pontosSemana || 1;

  // PUT /usuarios/{id} trocando a liga (regra: 1 liga por usuário, máx. 200 participantes)
  const entrar = async () => {
    if (!usuario) return;
    setSalvando(true);
    setMsg(null);
    try {
      await api.atualizarUsuario(USUARIO_ID, { nome: usuario.nome, email: usuario.email, ligaId });
      await Promise.all([atualizar(), recarregar()]);
      setMsg({ t: `Agora você faz parte da ${liga?.nome}!`, tipo: 'sucesso' });
    } catch (e) {
      setMsg({ t: e instanceof ApiError ? e.message : 'Erro ao trocar de liga.', tipo: 'erro' });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <section className="container-page pt-16">
      <Link to="/ligas" className="mono text-fog transition hover:text-pure">← Todas as ligas</Link>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono text-fog">{liga ? `${liga.regiao} · ${liga.participantes} guardiões` : 'Carregando…'}</p>
          <h1 className="display mt-4 text-[52px] md:text-[80px]">{liga?.nome ?? '—'}</h1>
        </div>
        <span className="eyebrow">Encerra em 2 dias e 4 horas</span>
      </div>

      <div className="mt-12 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <ol className="card divide-y divide-white/10 p-0">
          {!ranking && <li className="h-[320px] animate-pulse rounded-[16px]" />}
          {ranking?.length === 0 && <li className="px-8 py-10 text-sm">Nenhum guardião nesta liga ainda. Seja o primeiro!</li>}
          {ranking?.map((r, i) => {
            const voce = r.id === USUARIO_ID;
            return (
              <li key={r.id} className={`flex items-center gap-5 px-6 py-5 md:px-8 ${voce ? 'bg-pure text-void first:rounded-t-[16px] last:rounded-b-[16px]' : ''}`}>
                <span className={`w-8 font-mono text-sm ${voce ? 'text-void/60' : 'text-fog'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 ${voce ? 'font-medium' : 'text-cloud'}`}>{r.nome}{voce && ' · você'}</span>
                <span className="hidden w-32 sm:block">
                  <span className={`block h-1 rounded-full ${voce ? 'bg-void/15' : 'bg-steel'}`}>
                    <span className={`block h-1 rounded-full ${voce ? 'bg-void' : 'bg-cyan'}`} style={{ width: `${(r.pontosSemana / lider) * 100}%` }} />
                  </span>
                </span>
                <span className="w-20 text-right font-mono text-sm">{r.pontosSemana.toLocaleString('pt-BR')}</span>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-3">
          <div className="card-feature bg-silver text-void">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-void/60">Regras da liga</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>Ranking reinicia toda segunda-feira.</li>
              <li>Uma liga por usuário, definida pela localização.</li>
              <li>Até {liga?.maxParticipantes ?? 200} participantes por liga.</li>
            </ul>
          </div>
          <div className="card space-y-4">
            <p className="mono text-fog">Sua participação</p>
            {minhaLiga ? (
              <p className="text-sm text-cloud">Você já compete nesta liga.</p>
            ) : (
              <>
                <p className="text-sm">Mudou de bairro? Troque de liga — você sai da liga atual.</p>
                <button onClick={entrar} disabled={salvando || !usuario} className="btn-primario">Entrar nesta liga <Seta /></button>
              </>
            )}
            {msg && <Aviso tipo={msg.tipo} texto={msg.t} />}
          </div>
        </div>
      </div>
    </section>
  );
}
