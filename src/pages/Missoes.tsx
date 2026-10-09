import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, USUARIO_ID } from '../services/api';
import { useApi } from '../hooks/useApi';
import { corFundo } from '../data/conteudo';
import { CabecalhoPagina, Seta } from '../components/ui';
import { Carregando, ErroApi } from '../components/Estado';

const hoje = () => new Date().toISOString().slice(0, 10);

export default function Missoes() {
  const [filtro, setFiltro] = useState('Todas');
  const { dados: missoes, carregando, erro, recarregar } = useApi(api.listarMissoes);
  const { dados: validacoes } = useApi(() => api.validacoesDoUsuario(USUARIO_ID));

  // missões já validadas hoje pelo usuário
  const concluidasHoje = new Set(
    (validacoes ?? []).filter((v) => v.status === 'VALIDADO' && v.dataEnvio.startsWith(hoje())).map((v) => v.missaoId),
  );

  const categorias = ['Todas', ...new Set((missoes ?? []).map((m) => m.categoria))];
  const lista = (missoes ?? []).filter((m) => filtro === 'Todas' || m.categoria === filtro);

  return (
    <>
      <CabecalhoPagina
        eyebrow={missoes ? `${concluidasHoje.size}/${missoes.length} concluídas hoje` : 'Missões do dia'}
        titulo={<>Missões <em className="italic">sustentáveis</em></>}
        texto="Escolha uma ação, realize no mundo real e comprove em vídeo. Cada missão concluída rende SoulCoins."
      />

      <section className="container-page">
        {erro && <ErroApi erro={erro} onTentar={recarregar} />}
        {carregando && <Carregando />}

        {missoes && (
          <>
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filtrar por categoria">
              {categorias.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filtro === c}
                  onClick={() => setFiltro(c)}
                  className={`rounded-full border px-5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition duration-200 ${
                    filtro === c ? 'border-pure bg-pure text-void' : 'border-white/15 text-ash hover:border-white/40 hover:text-pure'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {lista.map((m) => (
                <Link
                  key={m.id}
                  to={`/missoes/${m.id}`}
                  className={`card-feature group flex min-h-[320px] flex-col justify-between transition duration-200 hover:-translate-y-1 ${corFundo[m.cor] ?? corFundo.iris}`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">
                    <span>{m.categoria}</span>
                    <span>{concluidasHoje.has(m.id) ? '✓ Concluída' : `+${m.recompensa} SC`}</span>
                  </div>
                  <div>
                    <h2 className="font-titulo text-[32px] font-light leading-[0.98]">{m.titulo}</h2>
                    <p className="mt-3 text-sm leading-relaxed opacity-80">{m.resumo}</p>
                    <div className="mt-6 flex items-center justify-between text-sm opacity-75">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em]">{m.duracao} · {m.dificuldade}</span>
                      <span className="transition group-hover:translate-x-1"><Seta /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
