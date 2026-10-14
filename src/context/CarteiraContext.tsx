import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, USUARIO_ID } from '../services/api';
import type { Carteira, Usuario } from '../types';

type CarteiraCtx = {
  usuario: Usuario | null;
  carteira: Carteira | null;
  saldo: number;
  atualizar: () => Promise<void>;
};

const Ctx = createContext<CarteiraCtx | null>(null);

/** Mantém usuário e saldo vindos da API disponíveis em todo o app. */
export function CarteiraProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carteira, setCarteira] = useState<Carteira | null>(null);

  const atualizar = useCallback(async () => {
    try {
      const [u, c] = await Promise.all([api.buscarUsuario(USUARIO_ID), api.carteira(USUARIO_ID)]);
      setUsuario(u);
      setCarteira(c);
    } catch {
      // as páginas exibem o erro; aqui mantemos o último estado válido
    }
  }, []);

  useEffect(() => {
    atualizar();
  }, [atualizar]);

  return (
    <Ctx.Provider value={{ usuario, carteira, saldo: carteira?.saldo ?? 0, atualizar }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCarteira() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCarteira precisa estar dentro do CarteiraProvider');
  return ctx;
}

export const emReais = (coins: number) =>
  (coins / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
