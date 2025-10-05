import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logojovens from '../assets/jovenslogo.png';
import logojoias from '../assets/joiaslogo.png';
import logocolunas from '../assets/colunaslogo.png';
import imgigreja from '../assets/FamiliaCavallari.jpeg';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Igreja Assembleia de Deus do Jardim Cavallari</h1>
          <p>"Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." - Mateus 11:28</p>
          <div className="hero-buttons">
            {/* Botão para Contato */}
            <Link to="/contato" className="btn-contato">
              📞 Fale Conosco
            </Link>
            
            {/* Botão Como Chegar - abrir Google Maps */}
            <button 
              className="btn-map"
              onClick={() => window.open('https://www.google.com/maps/place/Assembl%C3%A9ia+de+Deus+de+Mar%C3%ADlia+Jardim+Cavallari/@-22.2388245,-49.9769417,1007m/data=!3m1!1e3!4m6!3m5!1s0x94bfd79d89aa3785:0x31e185991f3ceaa8!8m2!3d-22.2368136!4d-49.977896!16s%2Fg%2F11bw62h4p4?entry=ttu&g_ep=EgoyMDI1MDkyMy4wIKXMDSoASAFQAw%3D%3D', '_blank')}
            >
              🗺️ Como Chegar
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            
            {/* Texto e Features - AGORA EM CIMA */}
            <div className="about-text">
              <h2>Bem-vindo à Família AD Cavallari</h2>
              <p>
                Somos uma comunidade cristã comprometida em servir a Deus e ao próximo. 
                Nossa missão é espalhar o amor de Cristo através de cultos inspiradores, 
                grupos de crescimento e ações sociais.
              </p>
              
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🙏</span>
                  <h4>Cultos Inspiradores</h4>
                  <p>Momentos de adoração e palavra</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">👨‍👩‍👧‍👦</span>
                  <h4>Família</h4>
                  <p>Família unida em Cristo</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌟</span>
                  <h4>Crescimento</h4>
                  <p>Jornada espiritual juntos</p>
                </div>
              </div>
            </div>
            
            {/* Imagem - AGORA EMBAIXO */}
            <div className="about-image">
              <div className="image-placeholder">
                <img src={imgigreja} alt='Igreja AD Cavallari' />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Ministérios Preview */}
      <section className="ministerios-preview">
        <div className="container">
          <div className="ministerios-header">
            <h2>Nossos Ministérios</h2>
            <p>Conheça os grupos que fazem nossa igreja</p>
          </div>
          
          <div className="ministerios-grid">
            {/* Ministério Jovens */}
            <div className="ministerio-preview">
              <div className="ministerios-image">
                <img src={logojovens} alt='jovens-logo' width={120} height={120}></img>
              </div>
              <h3>Jovens do Cavallari</h3>
              <p>Ministério de jovens comprometidos com Cristo</p>
              
              <div className="ministerio-buttons">
                <Link to="/ministerios" className="btn-primary">
                  📖 Conhecer Mais
                </Link>
                
                <button 
                  className="btn-secondary"
                  onClick={() => window.open('https://instagram.com/jovensdocavallari', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Seguir no Instagram
                </button>
              </div>
            </div>
            
            {/* Ministério Joias do Cavallari */}
            <div className="ministerio-preview">
              <div className="ministerios-image">
                <img src={logojoias} alt='joias-logo' width={120} height={120}></img>
              </div>
              <h3>Joias do Cavallari</h3>
              <p>Ministério infantil - nossas joias preciosas</p>
              
              <div className="ministerio-buttons">
                <Link to="/ministerios" className="btn-primary">
                  📖 Conhecer Mais
                </Link>
                
                <button 
                  className="btn-secondary"
                  onClick={() => window.open('https://instagram.com/joiasdocavallari', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Seguir no Instagram
                </button>
              </div>
            </div>
            
            {/* Ministério Colunas de Fé */}
            <div className="ministerio-preview">
              <div className="ministerios-image">
                <img src={logocolunas} alt='colunasdefe-logo' width={120} height={120}></img>
              </div>
              <h3>Colunas de Fé</h3>
              <p>Ministério de mulheres firmes na fé</p>
              
              <div className="ministerio-buttons">
                <Link to="/ministerios" className="btn-primary">
                  📖 Conhecer Mais
                </Link>
                
                <button 
                  className="btn-secondary"
                  onClick={() => window.open('https://instagram.com/colunasdefe_cavalari', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Seguir no Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
