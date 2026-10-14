import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, ApiError } from '../services/api';
import { Aviso, CabecalhoPagina, Seta } from '../components/ui';

const assuntos = ['Dúvida sobre missões', 'SoulCoins e conversão', 'Ligas', 'Parcerias', 'Outro'];

export default function Contato() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', assunto: assuntos[0], mensagem: '' });
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroApi, setErroApi] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [contagem, setContagem] = useState(5);

  // após o envio, redireciona para a Home com feedback
  useEffect(() => {
    if (!enviado) return;
    if (contagem === 0) {
      navigate('/', { replace: true });
      return;
    }
    const t = setTimeout(() => setContagem((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [enviado, contagem, navigate]);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    const novo: Record<string, string> = {};
    if (form.nome.trim().length < 3) novo.nome = 'Informe seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) novo.email = 'Informe um e-mail válido.';
    if (form.mensagem.trim().length < 10) novo.mensagem = 'Escreva ao menos 10 caracteres.';
    setErros(novo);
    if (Object.keys(novo).length) return;

    setEnviando(true);
    setErroApi('');
    try {
      await api.enviarContato(form); // POST /contatos
      setEnviado(true);
    } catch (err) {
      setErroApi(err instanceof ApiError ? err.message : 'Erro ao enviar a mensagem.');
    } finally {
      setEnviando(false);
    }
  };

  const campo = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value }),
  });

  return (
    <>
      <CabecalhoPagina eyebrow="Contato" titulo={<>Vamos <em className="italic">conversar</em></>} texto="Dúvidas, sugestões ou parcerias com concessionárias e prefeituras — respondemos em até 2 dias úteis." />
      <section className="container-page grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-3">
          {[['E-mail', 'contato@nuva.app'], ['Instituição', 'FIAP · Paulista'], ['Turma', '1TDSPV · 2026']].map(([r, v]) => (
            <div key={r} className="card">
              <p className="mono text-fog">{r}</p>
              <p className="mt-3 font-titulo text-2xl font-light text-cloud">{v}</p>
            </div>
          ))}
        </div>

        <div className="card">
          {enviado ? (
            <div className="flex h-full flex-col justify-center gap-6 py-10">
              <h2 className="display text-[44px]">Obrigado, <em className="italic">{form.nome.split(' ')[0]}</em>.</h2>
              <Aviso tipo="sucesso" texto={`Mensagem sobre “${form.assunto}” recebida. Redirecionando para a Home em ${contagem}s…`} />
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="mono text-fog">Nome</label>
                  <input id="nome" className="campo mt-2" placeholder="Seu nome" {...campo('nome')} />
                  {erros.nome && <p className="mt-2 text-xs text-orchid">{erros.nome}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mono text-fog">E-mail</label>
                  <input id="email" type="email" className="campo mt-2" placeholder="voce@email.com" {...campo('email')} />
                  {erros.email && <p className="mt-2 text-xs text-orchid">{erros.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="assunto" className="mono text-fog">Assunto</label>
                <select id="assunto" className="campo mt-2" {...campo('assunto')}>
                  {assuntos.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="mensagem" className="mono text-fog">Mensagem</label>
                <textarea id="mensagem" rows={6} className="campo mt-2 resize-none" placeholder="Como podemos ajudar?" {...campo('mensagem')} />
                {erros.mensagem && <p className="mt-2 text-xs text-orchid">{erros.mensagem}</p>}
              </div>
              {erroApi && <Aviso tipo="erro" texto={erroApi} />}
              <button disabled={enviando} className="btn-primario">{enviando ? 'Enviando…' : 'Enviar mensagem'} <Seta /></button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
