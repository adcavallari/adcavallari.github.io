import React, { useState, useEffect, useRef } from 'react';
import '../styles/Construcao.css';

// Import das imagens
import fotoIgreja1 from '../assets/fotoIgreja1.jpeg';
import fotoIgreja2 from '../assets/fotoIgreja2.jpeg';
import fotoIgreja3 from '../assets/fotoIgreja3.jpeg';
import fotoIgreja4 from '../assets/fotoIgreja4.jpeg';
import fotoIgreja5 from '../assets/fotoIgreja5.jpeg';
import fotoIgreja6 from '../assets/fotoIgreja6.jpeg';
import fotoIgreja7 from '../assets/fotoIgreja7.jpeg';
import fotoIgreja8 from '../assets/fotoIgreja8.jpeg';

const Construcao = () => {
  const [activeTab, setActiveTab] = useState('sobre');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const pixRef = useRef(null);

  // Dados da construção
  const construcaoData = {
    dataPrevista: 'Dezembro 2026'
  };

  // Fotos para o carrossel
  const carrosselFotos = [
    {
      id: 1,
      src: fotoIgreja1,
      titulo: 'Projeto',
      descricao: 'Fachada do Templo'
    },
    {
      id: 2,
      src: fotoIgreja2,
      titulo: 'Projeto',
      descricao: 'Vista da Igreja - Interna'
    },
    {
      id: 3,
      src: fotoIgreja3,
      titulo: 'Projeto',
      descricao: 'Vista Superior da Igreja - Interna'
    },
    {
      id: 4,
      src: fotoIgreja4,
      titulo: 'Projeto',
      descricao: 'Entrada do Templo'
    }
  ];

  // Galeria de fotos completa
  const fotosConstrucao = [
    ...carrosselFotos,
    {
      id: 5,
      src: fotoIgreja5,
      titulo: 'Projeto',
      descricao: 'Corredor Lateral'
    },
    {
      id: 6,
      src: fotoIgreja6,
      titulo: 'Projeto',
      descricao: 'Fundo - Salas, Banheiros e Cozinha'
    },
    {
      id: 7,
      src: fotoIgreja7,
      titulo: 'Projeto',
      descricao: 'Vista Inferior da Igreja - Interna'
    },
    {
      id: 8,
      src: fotoIgreja8,
      titulo: 'Projeto',
      descricao: 'Fundo - Salas, Banheiros e Cozinha'
    }
  ];

  // SVG Icons
  const SvgIcons = {
    whatsapp: ({ className = "" }) => (
      <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.91 1.71 1.19 1.95 1.33.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
      </svg>
    ),
    construction: ({ className = "" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7l7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),
    worker: ({ className = "" }) => (
      <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    paint: ({ className = "" }) => (
      <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"/>
      </svg>
    ),
    sound: ({ className = "" }) => (
      <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    ),
    kids: ({ className = "" }) => (
      <svg width="20" height="20" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M12 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm0 8c-3 0-6 1-6 3v2h12v-2c0-2-3-3-6-3z"/>
      </svg>
    ),
    calendar: ({ className = "" }) => (
      <svg width="16" height="16" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5z"/>
      </svg>
    ),
    check: ({ className = "" }) => (
      <svg width="16" height="16" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z"/>
      </svg>
    )
  };

  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText('igrejaadcavallari@email.com');
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carrosselFotos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carrosselFotos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carrosselFotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carrosselFotos.length) % carrosselFotos.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="pagina-construcao">
      {/* Hero Section com Carrossel */}
      <section className="construcao-hero">
        <div className="container">
          <div className="hero-content">
            <h1>🏗️ Novo Templo AD Cavallari</h1>
            <p className="hero-subtitle">Construindo juntos uma casa de adoração e milagres</p>
            
            {/* Carrossel de Fotos */}
            <div className="carrossel-container">
              <div className="carrossel">
                <div 
                  className="carrossel-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carrosselFotos.map((foto, index) => (
                    <div key={foto.id} className="carrossel-slide">
                      <img src={foto.src} alt={foto.titulo} />
                      <div className="carrossel-content">
                        <h3>{foto.titulo}</h3>
                        <p>{foto.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Botões de navegação */}
                <button className="carrossel-btn carrossel-prev" onClick={prevSlide}>
                  ‹
                </button>
                <button className="carrossel-btn carrossel-next" onClick={nextSlide}>
                  ›
                </button>
                
                {/* Indicadores */}
                <div className="carrossel-indicators">
                  {carrosselFotos.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="carrossel-info">
                <SvgIcons.calendar className="info-icon" />
                <span className='carrossel-text'>Previsão de conclusão: {construcaoData.dataPrevista}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação por Abas */}
      <section className="construcao-tabs">
        <div className="container">
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'sobre' ? 'active' : ''}`}
              onClick={() => setActiveTab('sobre')}
            >
              <span className="tab-icon">📖</span>
              Sobre a Obra
            </button>
            <button 
              className={`tab-btn ${activeTab === 'galeria' ? 'active' : ''}`}
              onClick={() => setActiveTab('galeria')}
            >
              <span className="tab-icon">🏗️</span>
              Galeria
            </button>
            <button 
              className={`tab-btn ${activeTab === 'doar' ? 'active' : ''}`}
              onClick={() => setActiveTab('doar')}
            >
              <span className="tab-icon">💝</span>
              Fazer Doação
            </button>
          </div>
        </div>
      </section>

      {/* Conteúdo das Abas */}
      <section className="construcao-conteudo">
        <div className="container">
          
          {/* ABA: SOBRE A OBRA */}
          {activeTab === 'sobre' && (
            <div className="tab-content sobre-content">
              <div className="sobre-grid">
                <div className="sobre-texto">
                  <h2>Uma Casa para a Glória de Deus</h2>
                  <p>
                    Estamos construindo um novo templo para abençoar nossa comunidade e 
                    expandir o Reino de Deus. Este será um lugar de encontro, adoração e 
                    transformação de vidas.
                  </p>
                  
                  <div className="detalhes-obra">
                    <h3>📐 Detalhes da Construção</h3>
                    <ul>
                      <li>
                        <SvgIcons.check className="check-icon" />
                        <strong>Área total:</strong> 440m²
                      </li>
                      <li>
                        <SvgIcons.check className="check-icon" />
                        <strong>Capacidade:</strong> 350 pessoas
                      </li>
                      <li>
                        <SvgIcons.check className="check-icon" />
                        <strong>Salas:</strong> Escola Bíblica, Administração, Sala Kids
                      </li>
                      <li>
                        <SvgIcons.check className="check-icon" />
                        <strong>Banheiros:</strong> 3 Banheiros
                      </li>
                      <li>
                        <SvgIcons.check className="check-icon" />
                        <strong>Acessibilidade:</strong> Total
                      </li>
                    </ul>
                  </div>

                  <div className="versiculo">
                    <blockquote>
                      "Assim diz o Senhor dos Exércitos: A glória desta última casa será maior 
                      do que a da primeira, diz o Senhor dos Exércitos; e neste lugar darei a paz, 
                      diz o Senhor dos Exércitos."
                    </blockquote>
                    <cite>Ageu 2:9</cite>
                  </div>
                </div>
                
                <div className="sobre-imagem">
                  <div className="sobre-imagem-container">
                    <img 
                      src={fotoIgreja1}
                      alt="Projeto do novo templo" 
                    />
                  </div>
                  <div className="legenda-imagem">Fachada Novo Templo</div>
                </div>
              </div>
            </div>
          )}

          {/* ABA: GALERIA */}
          {activeTab === 'galeria' && (
            <div className="tab-content galeria-content">
              <h2>📸 Acompanhe a Evolução da Obra</h2>
              <p>Veja como está progredindo a construção do nosso novo templo</p>
              
              <div className="galeria-grid">
                {fotosConstrucao.map(foto => (
                  <div key={foto.id} className="galeria-item">
                    <div className="galeria-imagem">
                      <img src={foto.src} alt={foto.titulo} />
                      <div className="galeria-overlay">
                        <div className="galeria-info">
                          <h4>{foto.titulo}</h4>
                          <span>{foto.descricao}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: DOAÇÕES - SIMPLIFICADA */}
          {activeTab === 'doar' && (
            <div className="tab-content doacao-content">
              <div className="doacao-header">
                <h2>💝 Seja um Construtor com a Gente</h2>
                <p>
                  Sua contribuição é essencial para concluirmos esta obra abençoada. 
                  Cada oferta é um tijolo na construção do Reino de Deus.
                </p>
              </div>

              <div className="doacao-simplificada">
                <div className="doacao-card">
                  <div className="doacao-icon">
                    <SvgIcons.whatsapp />
                  </div>
                  <h3>Realizar Doação via WhatsApp</h3>
                  <p>
                    Entre em contato conosco pelo WhatsApp para receber 
                    todas as informações sobre como contribuir com a construção 
                    do nosso novo templo.
                  </p>
                  <a 
                    href="https://wa.me/5514997222798?text=Olá, a Paz do Senhor! Gostaria de fazer uma doação para a construção do novo templo da AD Cavallari."
                    className="btn-doacao-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SvgIcons.whatsapp /> Falar no WhatsApp
                  </a>
                </div>
              </div>

              {/* Benefícios da Doação */}
              <div className="beneficios-doacao">
                <h3>🎁 Sua doação ajuda em:</h3>
                <div className="beneficios-grid">
                  <div className="beneficio-item">
                    <div className="beneficio-icon">
                      <SvgIcons.construction />
                    </div>
                    <span>Materiais de construção</span>
                  </div>
                  <div className="beneficio-item">
                    <div className="beneficio-icon">
                      <SvgIcons.worker />
                    </div>
                    <span>Mão de obra especializada</span>
                  </div>
                  <div className="beneficio-item">
                    <div className="beneficio-icon">
                      <SvgIcons.paint />
                    </div>
                    <span>Acabamentos e mobiliário</span>
                  </div>
                  <div className="beneficio-item">
                    <div className="beneficio-icon">
                      <SvgIcons.sound />
                    </div>
                    <span>Sistema de som e iluminação</span>
                  </div>
                  <div className="beneficio-item">
                    <div className="beneficio-icon">
                      <SvgIcons.kids />
                    </div>
                    <span>Área infantil e educacional</span>
                  </div>
                </div>
              </div>

              {/* Versículo Inspirador */}
              <div className="versiculo-doacao">
                <blockquote>
                  "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, 
                  pois Deus ama quem dá com alegria."
                </blockquote>
                <cite>2 Coríntios 9:7</cite>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="construcao-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Juntos na Obra do Senhor</h2>
            <p>Sua participação faz parte desta história de fé e milagres</p>
            <button 
              className="btn-cta"
              onClick={() => setActiveTab('doar')}
            >
              Quero Contribuir
            </button>
          </div>
        </div>
      </section>

      {/* Toast de Cópia */}
      {copiado && (
        <div className="toast-copiada">
          <SvgIcons.check /> Chave PIX copiada para a área de transferência!
        </div>
      )}
    </div>
  );
};

export default Construcao;