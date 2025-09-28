import React, { useState, useEffect } from 'react';
import YouTubeService from '../services/youtubeService';
import '../styles/Transmissoes.css';

const Transmissoes = () => {
  const [videos, setVideos] = useState([]);
  const [liveStream, setLiveStream] = useState(null);
  const [upcomingLives, setUpcomingLives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Componente de Thumbnail
  const VideoThumbnail = ({ video }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div 
        className="video-thumbnail"
        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
      >
        {!imageError ? (
          <img 
            src={video.thumbnail} 
            alt={video.titulo}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        ) : (
          <div className="thumbnail-fallback">
            <span>📺</span>
            <p>Thumbnail não disponível</p>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="image-loading">📺 Carregando...</div>
        )}
        
        <div className="video-duracao">{video.duracaoLegivel}</div>
        <div className="play-overlay">▶</div>
      </div>
    );
  };

  // 🔥 CORRIGIDO: Formatar data das lives programadas
  const formatUpcomingDate = (date) => {
    const now = new Date();
    const liveDate = new Date(date);
    
    // Ajusta para o fuso horário brasileiro (UTC-3)
    const adjustedLiveDate = new Date(liveDate.getTime());
    const adjustedNow = new Date(now.getTime());
    
    // Calcula a diferença em dias (considerando apenas a data, não horas)
    const liveDay = new Date(adjustedLiveDate.getFullYear(), adjustedLiveDate.getMonth(), adjustedLiveDate.getDate());
    const today = new Date(adjustedNow.getFullYear(), adjustedNow.getMonth(), adjustedNow.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const diffDays = Math.floor((liveDay - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Hoje às ${adjustedLiveDate.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      })}`;
    } else if (diffDays === 1) {
      return `Amanhã às ${adjustedLiveDate.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      })}`;
    } else {
      return adjustedLiveDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
    }
  };

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Iniciando busca de transmissões...');

      // Buscar transmissão ao vivo ATIVA
      const liveData = await YouTubeService.getLiveStreams();
      if (liveData.items && liveData.items.length > 0) {
        setLiveStream(liveData.items[0]);
        console.log('🔴 Live ATIVA encontrada:', liveData.items[0].snippet.title);
      } else {
        console.log('📡 Nenhuma live ativa no momento');
        setLiveStream(null);
      }

      // Buscar lives PROGRAMADAS
      const upcomingData = await YouTubeService.getUpcomingLiveStreams();
      setUpcomingLives(upcomingData);
      console.log('📅 Lives programadas:', upcomingData);

      // Buscar vídeos PUBLICADOS (agora filtrados)
      const videosData = await YouTubeService.getRecentVideos(6);
      setVideos(videosData);

      // Verificar se está usando fallback
      if (videosData[0]?.id.includes('fallback')) {
        console.log('⚠️ Usando vídeos de fallback');
        setUsingFallback(true);
      } else {
        console.log('✅ Lives reais da API');
        setUsingFallback(false);
      }

    } catch (err) {
      console.error('❌ Erro ao carregar transmissões:', err);
      setError('Erro ao carregar transmissões. Verifique sua conexão com a internet.');
      setUsingFallback(true);
      
      // Carrega fallback mesmo com erro
      const fallbackVideos = YouTubeService.getFallbackVideos(6);
      setVideos(fallbackVideos);
      setUpcomingLives([]); // Não mostra próximas lives em caso de erro
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (views) => {
    const num = parseInt(views);
    if (isNaN(num)) return '0';
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="transmissoes-page">
        <section className="transmissoes-hero">
          <div className="container">
            <h1>Transmissões ao Vivo</h1>
            <p>Carregando transmissões...</p>
          </div>
        </section>
        <div className="loading">
          <div className="spinner"></div>
          📺 Conectando ao YouTube...
        </div>
      </div>
    );
  }

  return (
    <div className="transmissoes-page">
      {/* Hero Section */}
      <section className="transmissoes-hero">
        <div className="container">
          <h1>Transmissões ao Vivo</h1>
          <p>Participe dos nossos cultos online e assista às gravações das lives anteriores</p>
          {usingFallback && (
            <div className="api-warning">
              ⚠️ Modo offline - usando transmissões pré-carregadas
            </div>
          )}
        </div>
      </section>

      {/* Transmissão Ao Vivo ATIVA */}
      <section className="transmissao-ao-vivo">
        <div className="container">
          {liveStream ? (
            <div className="live-status">
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span className="live-text">🔴 TRANSMISSÃO AO VIVO AGORA</span>
              </div>
              
              <div className="live-player">
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${liveStream.id.videoId}?autoplay=1`}
                    title={liveStream.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="live-info">
                  <h3>{liveStream.snippet.title}</h3>
                  <p>Transmissão ao vivo - Igreja AD Cavallari</p>
                  <button 
                    className="btn-live"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${liveStream.id.videoId}`, '_blank')}
                  >
                    📺 Assistir no YouTube
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // 🔥 ATUALIZADO: Container com imagem de fundo quando não tem live
            <div className="sem-live-container">
              <div className="sem-live-content">
                <h3>📡 Nenhuma transmissão ao vivo no momento</h3>
                <p>Nosso próximo culto será em breve. Enquanto isso, assista aos cultos anteriores ou confira nossa programação.</p>
                
                <div className="programacao">
                  <div className="horario-item">
                    <span className="dia">Terça-feira</span>
                    <span className="hora">20:00 - Tarde da Benção</span>
                  </div>
                  <div className="horario-item">
                    <span className="dia">Quarta-feira</span>
                    <span className="hora">20:00 - Culto de Ensino</span>
                  </div>
                  <div className="horario-item">
                    <span className="dia">Sexta-feira</span>
                    <span className="hora">19:45 - Culto de Oração</span>
                  </div>
                  <div className="horario-item">
                    <span className="dia">Domingo</span>
                    <span className="hora">09:00 - EBD</span>
                  </div>
                  <div className="horario-item">
                    <span className="dia">Domingo</span>
                    <span className="hora">18:30 - Culto da Família</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Próximas Transmissões Programadas */}
      {upcomingLives.length > 0 && (
        <section className="proximas-transmissoes">
          <div className="container">
            <h2>Próximas Transmissões</h2>
            <p className="section-subtitle">Lives programadas - Agende e não perca!</p>
            
            <div className="upcoming-grid">
              {upcomingLives.map((live, index) => (
                <div key={live.id || index} className="upcoming-card">
                  <div className="upcoming-thumbnail">
                    <img 
                      src={live.thumbnail} 
                      alt={live.titulo}
                    />
                    <div className="upcoming-badge">
                      ⏰ Programada
                    </div>
                    <div className="upcoming-overlay">
                      <div className="upcoming-info">
                        <div className="upcoming-date">
                          {formatUpcomingDate(live.dataProgramada)}
                        </div>
                        <button 
                          className="btn-reminder"
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${live.videoId}`, '_blank')}
                        >
                          🎯 Definir Lembrete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="upcoming-details">
                    <h4 className="upcoming-title">{live.titulo}</h4>
                    <p className="upcoming-description">
                      {live.descricao.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lives Anteriores (que viraram vídeos) */}
      <section className="cultos-anteriores">
        <div className="container">
          <h2>Cultos Anteriores</h2>
          <p className="section-subtitle">Assista às gravações dos nossos últimos cultos</p>
          
          {error && (
            <div className="error-message">
              {error} 
              <button onClick={loadVideos} className="btn-retry">
                🔄 Tentar Novamente
              </button>
            </div>
          )}

          <div className="videos-grid">
            {videos.map((video, index) => (
              <div key={video.id || index} className="video-card">
                <VideoThumbnail video={video} />
                
                <div className="video-info">
                  <h4 className="video-titulo">{video.titulo}</h4>
                  <div className="video-meta">
                    <span className="video-data">{video.data}</span>
                    <span className="video-visualizacoes">
                      👁️ {formatViewCount(video.visualizacoes)} visualizações
                    </span>
                  </div>
                  <div className="video-duracao-badge">
                    ⏱️ {video.duracaoLegivel}
                  </div>
                  <button 
                    className="btn-assistir"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                  >
                    ▶ Assistir Gravação
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Canal YouTube */}
      <section className="canal-youtube">
        <div className="container">
          <div className="canal-info">
            <h2>🎬 Inscreva-se no nosso canal</h2>
            <p>Não perca nenhuma live! Ative o sininho para receber notificações das próximas transmissões.</p>
            <a 
              href="https://www.youtube.com/@ADCavallari" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-assistir"
              style={{textDecoration: 'none', width: 'auto', padding: '12px 30px', display: 'inline-flex'}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Visitar Canal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transmissoes;