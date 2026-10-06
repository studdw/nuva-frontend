import { useState, type FormEvent } from 'react';
import { api, ApiError, USUARIO_ID } from '../services/api';
import { useCarteira, emReais } from '../context/CarteiraContext';
import { Aviso, BotaoLink, CabecalhoPagina, Seta } from '../components/ui';

export default function Carteira() {
  const { saldo, carteira, atualizar } = useCarteira();
  const [valor, setValor] = useState(100);
  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState<{ t: string; tipo: 'erro' | 'sucesso' } | null>(null);

  const solicitar = async (e: FormEvent) => {
    e.preventDefault();
    // validação no front (a API valida de novo no ConversaoBo)
    if (valor < 100) return setMsg({ t: 'A conversão mínima é de 100 SoulCoins.', tipo: 'erro' });
    if (valor > saldo) return setMsg({ t: 'Saldo insuficiente para essa conversão.', tipo: 'erro' });

    setEnviando(true);
    try {
      await api.converter(USUARIO_ID, valor);
      await atualizar();
      setMsg({ t: `Pronto! ${emReais(valor)} serão aplicados na sua próxima fatura em até 24h.`, tipo: 'sucesso' });
    } catch (err) {
      setMsg({ t: err instanceof ApiError ? err.message : 'Erro ao converter.', tipo: 'erro' });
    } finally {
      setEnviando(false);
    }
  };

  const cancelar = async (id: number) => {
    try {
      await api.cancelarConversao(id);
      await atualizar();
      setMsg({ t: 'Conversão cancelada e SoulCoins estornados.', tipo: 'sucesso' });
    } catch (err) {
      setMsg({ t: err instanceof ApiError ? err.message : 'Erro ao cancelar.', tipo: 'erro' });
    }
  };

  return (
    <>
      <CabecalhoPagina eyebrow="100 SoulCoins = R$ 1,00" titulo={<>Sua <em className="italic">carteira</em></>} />

      <section className="container-page grid gap-3 lg:grid-cols-2">
        <div className="card-feature flex min-h-[360px] flex-col justify-between bg-iris text-pure">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">Saldo disponível</p>
          <div>
            <p className="font-titulo text-[72px] font-light leading-none md:text-[96px]">{carteira ? saldo.toLocaleString('pt-BR') : '—'}</p>
            <p className="mt-3 font-mono text-sm opacity-80">SoulCoins ≈ {emReais(saldo)} de desconto</p>
          </div>
        </div>

        <form onSubmit={solicitar} className="card flex flex-col justify-between gap-6">
          <div>
            <p className="mono text-fog">Converter em desconto</p>
            <label className="mt-6 block text-sm" htmlFor="valor">Quantos SoulCoins?</label>
            <input id="valor" type="number" min={100} step={100} value={valor} onChange={(e) => setValor(Number(e.target.value))} className="campo mt-2 font-mono" />
            <input type="range" min={100} max={Math.max(100, saldo - (saldo % 100))} step={100} value={Math.min(valor, Math.max(100, saldo))} onChange={(e) => setValor(Number(e.target.value))} className="mt-5 w-full accent-white" aria-label="Ajustar valor" />
            <p className="mt-4 text-sm">Você recebe <span className="font-mono text-pure">{emReais(valor)}</span> na fatura da concessionária cadastrada.</p>
          </div>
          {msg && <Aviso tipo={msg.tipo} texto={msg.t} />}
          <button disabled={enviando} className="btn-primario self-start">{enviando ? 'Processando…' : 'Solicitar conversão'} <Seta /></button>
        </form>
      </section>

      <section className="container-page mt-3">
        <div className="card overflow-x-auto">
          <p className="mono text-fog">Histórico de conversões</p>
          <table className="mt-6 w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="mono text-[10px] text-fog">
                <th className="pb-3 font-normal">Data</th>
                <th className="pb-3 font-normal">SoulCoins</th>
                <th className="pb-3 text-right font-normal">Desconto</th>
                <th className="pb-3 text-right font-normal">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono">
              {carteira?.conversoes.length === 0 && (
                <tr><td colSpan={4} className="py-6 font-sans text-ash">Nenhuma conversão ainda.</td></tr>
              )}
              {carteira?.conversoes.map((c) => (
                <tr key={c.id}>
                  <td className="py-4">{new Date(c.data + 'T00:00').toLocaleDateString('pt-BR')}</td>
                  <td className="py-4">−{c.coins.toLocaleString('pt-BR')}</td>
                  <td className="py-4 text-right text-pure">{emReais(c.coins)}</td>
                  <td className="py-4 text-right">
                    <button onClick={() => cancelar(c.id)} className="mono text-[10px] text-fog transition hover:text-pure">Cancelar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <BotaoLink to="/missoes">Ganhar mais SoulCoins</BotaoLink>
        </div>
      </section>
    </>
  );
}
