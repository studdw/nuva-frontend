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

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            {mensagem && (
                <div className="container-page pt-6">
                    <Aviso texto={mensagem} tipo="erro" />
                </div>
            )}

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}



