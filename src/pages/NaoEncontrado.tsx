import { useLocation } from 'react-router-dom';
import { BotaoLink } from '../components/ui';

export default function NaoEncontrado() {
  const { pathname } = useLocation();
  return (
    <section className="container-page py-[140px] text-center">
      <p className="mono text-fog">Erro 404</p>
      <h1 className="display mx-auto mt-6 max-w-3xl text-[64px] md:text-[96px]">Essa luz <em className="italic">apagou</em></h1>
      <p className="subhead mx-auto mt-6 max-w-md">A página <span className="font-mono text-cloud">{pathname}</span> não existe ou foi movida.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <BotaoLink to="/">Voltar para a Home</BotaoLink>
        <BotaoLink to="/missoes" variante="fantasma">Ver missões</BotaoLink>
      </div>
    </section>
  );
}
