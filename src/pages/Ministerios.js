import React from 'react';
import '../styles/Ministerios.css';
import logojovens from '../assets/jovenslogo.png';
import logojoias from '../assets/joiaslogo.png';
import logocolunas from '../assets/colunaslogo.png';

const Ministerios = () => {
  const ministerios = [
    {
      id: 1,
      nome: "Jovens do Cavallari",
      instagram: "jovensdocavallari",
      url: "https://www.instagram.com/jovensdocavallari/",
      descricao: "Ministério de jovens que desejam viver a fé de forma verdadeira, sendo luz em sua geração.",
      hashtag: "#jovensdocavallari",
      cor: "#2563eb",
      lideres: ["Pb. Lucas Santos"],
      linha: "",
      logo: logojovens,
      alt: "logo-jovens"
    },
    {
      id: 2,
      nome: "Joias do Cavallari",
      instagram: "joiasdocavallari",
      url: "https://www.instagram.com/joiasdocavallari/",
      descricao: "Ministério infantil onde nossas crianças são tratadas como joias preciosas aos olhos de Deus.",
      hashtag: "#joiasdocavallari",
      cor: "#fbbf24",
      lideres: ["Francine Foster"],
      linha: <br></br>,
      logo: logojoias,
      alt: "logo-joias"
    },
    {
      id: 3,
      nome: "Colunas de Fé",
      instagram: "colunasdefe_cavalari",
      url: "https://www.instagram.com/colunasdefe_cavalari/",
      descricao: "Ministério de irmãs que buscam ser colunas firmes na fé, apoiando umas às outras em Cristo.",
      hashtag: "#colunasdefe",
      cor: "#dc2626",
      lideres: ["Eliciane Nascimento"],
      linha: <br></br>,
      logo: logocolunas,
      alt: "logo-colunasdefe"
    }
  ];

  // SVG do Instagram com cor fixa
  const InstagramIcon = ({ color = "#FFFFFF", size = 20 }) => (
  <svg className="instagram-icon" width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

  return (
    <div className="ministerios-page">
      <section className="ministerios-hero">
        <div className="container">
          <h1>Nossos Ministérios</h1>
          <p>Conheça os grupos que fazem parte da nossa família espiritual</p>
        </div>
      </section>

      <section className="ministerios-list">
        <div className="container">
          <div className="ministerios-grid">
            {ministerios.map(ministerio => (
              <div key={ministerio.id} className="ministerio-card">
                <div className="card-header" style={{ background: ministerio.cor }}>
                  <div className="ministerios-image">
                    <img src={ministerio.logo} alt={ministerio.alt} width={120} height={120}></img>
                  </div>
                  <h2>{ministerio.nome}</h2>
                </div>

                <div className="card-content">
                  <p className="ministerio-descricao">{ministerio.descricao}</p>
                  
                  <div className="ministerio-info">
                    <div className="info-item">
                      <h3 className="info-label">Líder:</h3>
                      <h3>{ministerio.lideres.join(',')}</h3>
                    </div>
                  </div>

                  {/* Instagram Section */}
                  <div className="instagram-section">
                    <div className="instagram-header">
                      <InstagramIcon color="#374151" size={20} />
                      <div className="instagram-info">
                        <a 
                          href={ministerio.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="instagram-link"
                          style={{ color: '#2563eb' }} 
                        >
                          @{ministerio.instagram}
                        </a>
                        <span 
                          className="instagram-hashtag"
                          style={{ color: '#6b7280' }} 
                        >
                          {ministerio.hashtag}
                        </span>
                      </div>
                    </div>

                    <button 
                      className="btn-seguir"
                      onClick={() => window.open(ministerio.url, '_blank')}
                      style={{ 
                        background: ministerio.cor,
                        color: 'white' // Força cor branca inline
                      }}
                    >
                      <InstagramIcon color="white" size={18} />
                      <span style={{ color: 'white' }}>Seguir no Instagram</span>
                    </button>
                  </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ministerios;