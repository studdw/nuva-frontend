import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '../services/api';

/** Executa uma chamada à API e controla os estados de carregando, erro e dados. */
export function useApi<T>(chamada: () => Promise<T>, deps: unknown[] = []) {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executar = useCallback(chamada, deps);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setDados(await executar());
    } catch (e) {
      setErro(e instanceof ApiError ? e : new ApiError(0, 'Erro inesperado.'));
    } finally {
      setCarregando(false);
    }
  }, [executar]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { dados, carregando, erro, recarregar };
}
