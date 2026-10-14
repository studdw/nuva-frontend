import type { ApiError } from '../services/api';
import { Aviso } from './ui';

/** Esqueleto de carregamento e erro padronizados para chamadas à API. */
export function Carregando({ itens = 3 }: { itens?: number }) {
  return (
    <div className="grid gap-3 md:grid-cols-3" aria-busy="true" aria-label="Carregando">
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="h-[300px] animate-pulse rounded-[30px] bg-graphite" />
      ))}
    </div>
  );
}

export function ErroApi({ erro, onTentar }: { erro: ApiError; onTentar?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Aviso tipo="erro" texto={erro.message} />
      {onTentar && <button onClick={onTentar} className="btn-fantasma">Tentar novamente</button>}
    </div>
  );
}
