import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Aviso } from './ui';

export default function Layout() {
    const { pathname, state } = useLocation();
    const mensagem = (state as { mensagem?: string } | null)?.mensagem;

    // Volta ao topo a cada troca de rota
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



