import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Missoes from './pages/Missoes';
import MissaoDetalhe from './pages/MissaoDetalhe';
import Ligas from './pages/Ligas';
import LigaDetalhe from './pages/LigaDetalhe';
import Carteira from './pages/Carteira';
import ModeloNegocio from './pages/ModeloNegocio';
import Integrantes from './pages/Integrantes';
import IntegranteDetalhe from './pages/IntegranteDetalhe';
import Faq from './pages/Faq';
import Contato from './pages/Contato';
import NaoEncontrado from './pages/NaoEncontrado';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* rotas estáticas */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/ligas" element={<Ligas />} />
        <Route path="/carteira" element={<Carteira />} />
        <Route path="/modelo-de-negocio" element={<ModeloNegocio />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />

        {/* rotas dinâmicas com parâmetros */}
        <Route path="/missoes/:id" element={<MissaoDetalhe />} />
        <Route path="/ligas/:id" element={<LigaDetalhe />} />
        <Route path="/integrantes/:rm" element={<IntegranteDetalhe />} />

        {/* redirecionamentos */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Navigate to="/sobre" replace />} />
        <Route path="/jogo" element={<Navigate to="/missoes" replace />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  );
}
