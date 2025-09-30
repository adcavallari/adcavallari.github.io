import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'; // ← CORRIGIDO
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import Ministerios from './pages/Ministerios';
import Contato from './pages/Contato';
import Transmissoes from './pages/Transmissoes';
import Construcao from './pages/Construcao';
import './styles/App.css';

function App() {
  return (
    <HashRouter> {/* ← AGORA ESTÁ DEFINIDO */}
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ministerios" element={<Ministerios />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/transmissoes" element={<Transmissoes />} />
            <Route path="/construcao" element={<Construcao />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;