import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { api, ApiError, USUARIO_ID } from '../services/api';
import { useApi } from '../hooks/useApi';
import { corFundo } from '../data/conteudo';
import { useCarteira } from '../context/CarteiraContext';
import { Aviso, BotaoLink, Seta } from '../components/ui';
import { ErroApi } from '../components/Estado';
import type { Validacao } from '../types';

const MAX_TENTATIVAS = 3;
const hoje = () => new Date().toISOString().slice(0, 10);

export default function MissaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const missaoId = Number(id);
  const { atualizar } = useCarteira();

  const { dados: missao, carregando, erro } = useApi(() => api.buscarMissao(missaoId), [missaoId]);
  const { dados: validacoes, recarregar: recarregarValidacoes } = useApi(() => api.validacoesDoUsuario(USUARIO_ID), [missaoId]);

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [rostoVisivel, setRostoVisivel] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Validacao | null>(null);
  const [erroEnvio, setErroEnvio] = useState('');

  // rota dinâmica inválida (id não numérico ou 404 da API) → redireciona com mensagem
  if (Number.isNaN(missaoId) || erro?.status === 404) {
    return <Navigate to="/missoes" replace state={{ mensagem: `A missão “${id}” não existe. Escolha uma das missões disponíveis.` }} />;
  }

  const deHoje = (validacoes ?? []).filter((v) => v.missaoId === missaoId && v.dataEnvio.startsWith(hoje()));
  const usadas = deHoje.length;
  const feita = deHoje.some((v) => v.status === 'VALIDADO');
  const esgotou = usadas >= MAX_TENTATIVAS && !feita;

  const enviar = async () => {
    setErroEnvio('');
    setResultado(null);
    if (!arquivo) return setErroEnvio('Selecione um vídeo antes de enviar.');
    if (!/\.(mp4|mov)$/i.test(arquivo.name)) return setErroEnvio('Formato inválido. Envie um vídeo MP4 ou MOV.');

    setEnviando(true);
    try {
      const v = await api.enviarValidacao({ usuarioId: USUARIO_ID, missaoId, nomeArquivo: arquivo.name, rostoVisivel });
      setResultado(v);
      await Promise.all([recarregarValidacoes(), atualizar()]);
    } catch (e) {
      setErroEnvio(e instanceof ApiError ? e.message : 'Erro ao enviar o vídeo.');
    } finally {
      setEnviando(false);
    }
  };

  if (erro) return <section className="container-page pt-16"><ErroApi erro={erro} /></section>;
  if (carregando || !missao) {
    return <section className="container-page pt-16"><div className="h-[460px] animate-pulse rounded-[30px] bg-graphite" /></section>;
  }

  return (
    <section className="container-page pt-16">
      <Link to="/missoes" className="mono text-fog transition hover:text-pure">← Todas as missões</Link>

      <div className="mt-10 grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <div className={`card-feature flex min-h-[460px] flex-col justify-between ${corFundo[missao.cor] ?? corFundo.iris}`}>
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">
            <span>{missao.categoria}</span>
            <span>{missao.duracao} · {missao.dificuldade}</span>
          </div>
          <div>
            <p className="font-mono text-sm opacity-75">+{missao.recompensa} SoulCoins</p>
            <h1 className="mt-4 font-titulo text-[44px] font-light leading-[0.95] md:text-[64px]">{missao.titulo}</h1>
            <p className="mt-6 max-w-lg text-lg font-light opacity-85">{missao.resumo}</p>
          </div>
        </div>

        <div className="card flex flex-col gap-8">
          <div>
            <p className="mono text-fog">Passo a passo</p>
            <ol className="mt-4 space-y-4">
              {missao.passos.map((p, i) => (
                <li key={p} className="flex gap-4 text-sm leading-relaxed text-cloud">
                  <span className="font-mono text-xs text-fog">0{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[16px] bg-obsidian p-5">
              <p className="mono text-fog">Critério da IA</p>
              <p className="mt-2 text-sm leading-relaxed">{missao.criterio}</p>
            </div>
            <div className="rounded-[16px] bg-obsidian p-5">
              <p className="mono text-fog">Impacto</p>
              <p className="mt-2 text-sm leading-relaxed">{missao.impacto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRO */}
      <div className="mt-3 rounded-[16px] bg-abyss p-8 md:p-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono text-fog">Registrar missão</p>
            <h2 className="display mt-3 text-[38px]">Comprove sua <em className="italic">ação</em></h2>
          </div>
          <p className="font-mono text-xs text-ash">Tentativas hoje: {usadas}/{MAX_TENTATIVAS}</p>
        </div>

        {feita ? (
          <div className="mt-8 space-y-6">
            <Aviso tipo="sucesso" texto={resultado?.mensagem ?? 'Missão concluída hoje! Volte amanhã para uma nova.'} />
            <div className="flex flex-wrap gap-3">
              <BotaoLink to="/carteira">Ver carteira</BotaoLink>
              <BotaoLink to="/missoes" variante="fantasma">Próxima missão</BotaoLink>
            </div>
          </div>
        ) : esgotou ? (
          <div className="mt-8"><Aviso tipo="erro" texto="Você usou as 3 tentativas desta missão hoje. Tente novamente amanhã." /></div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed border-white/20 px-6 py-10 text-center transition hover:border-white/50">
                <span className="text-3xl text-pure">⏺</span>
                <span className="mt-3 text-sm text-cloud">{arquivo ? arquivo.name : 'Gravar ou enviar vídeo'}</span>
                <span className="mono mt-2 text-[10px] text-fog">MP4 ou MOV · até 30 segundos</span>
                <input type="file" accept="video/mp4,video/quicktime,.mp4,.mov" capture="user" className="sr-only" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} />
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={rostoVisivel} onChange={(e) => setRostoVisivel(e.target.checked)} className="h-4 w-4 accent-white" />
                Meu rosto aparece no vídeo <span className="mono text-[10px] text-fog">(simulação da IA)</span>
              </label>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <ul className="space-y-3 text-sm">
                {['Mantenha o rosto visível no início do vídeo', 'Mostre claramente a ação realizada', 'Grave em local iluminado'].map((d) => (
                  <li key={d} className="flex gap-3"><span className="text-pure">✓</span>{d}</li>
                ))}
              </ul>

              {erroEnvio && <Aviso tipo="erro" texto={erroEnvio} />}
              {enviando && (
                <div>
                  <p className="mono text-cyan">IA analisando seu vídeo…</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-steel"><div className="carregando h-1 bg-cyan" /></div>
                </div>
              )}
              {resultado?.status === 'RECUSADO' && <Aviso tipo="erro" texto={resultado.mensagem} />}

              <div>
                <button onClick={enviar} disabled={enviando} className="btn-primario">Enviar para validação <Seta /></button>
                <p className="mt-3 text-xs text-fog">Sua ação será validada em instantes.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
