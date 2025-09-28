import config from '../config/youtube';

class YouTubeService {
  constructor() {
    // 🔥 KEYS DIRETAS NO CÓDIGO (substitua pelas suas keys)
    this.apiKeys = [
      'AIzaSyBAwcYfyhT8lwQg8Fz1GSVUqC-hjFZHFFI',
      'AIzaSyAHC6AIoxcXzOkpX73aM-Qg8751QYRmwso', 
      'AIzaSyC1Bkw9TjC3xlFn73r4JpLc06WHJaGk7W0',
      'AIzaSyBaUtwYTTaN-aNSrX0Suzln2-RxuTKM5sg',
      'AIzaSyBuk-TyaFlcApXidbPKbO8unTS8DJAlnqM'
    ];
    
    this.currentKeyIndex = 0;
    this.failedKeys = new Set();
    this.channelHandle = '@ADCavallari';
    this.baseURL = 'https://www.googleapis.com/youtube/v3';
    this.channelId = null;
    this.cache = new Map();
    
    console.log('🔑 API Keys configuradas:', this.apiKeys.length);
  }

  getCurrentApiKey() {
    // Se todas as keys falharam, retorna a primeira como fallback
    if (this.failedKeys.size >= this.apiKeys.length) {
      console.warn('⚠️ Todas as API Keys falharam, usando fallback');
      return this.apiKeys[0];
    }

    // Encontra uma key que não falhou
    for (let i = 0; i < this.apiKeys.length; i++) {
      const key = this.apiKeys[this.currentKeyIndex];
      
      if (!this.failedKeys.has(key)) {
        console.log(`🔑 Usando API Key ${this.currentKeyIndex + 1}/${this.apiKeys.length}`);
        return key;
      }
      
      // Próxima key
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    }

    return this.apiKeys[0];
  }

  async makeRequest(endpoint, params = {}) {
    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
    
    // Verifica cache primeiro (5 minutos)
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
        console.log('📦 Usando cache:', endpoint);
        return cached.data;
      }
    }

    try {
      const apiKey = this.getCurrentApiKey();
      const queryParams = new URLSearchParams({
        key: apiKey,
        ...params
      });

      const url = `${this.baseURL}/${endpoint}?${queryParams}`;
      console.log('🌐 Request:', endpoint);

      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 403) {
          console.warn(`⚠️ Quota excedida na key ${this.currentKeyIndex + 1}`);
          this.failedKeys.add(apiKey);
          
          // Tenta com próxima key
          this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
          console.log('🔄 Tentando com próxima API Key...');
          return this.makeRequest(endpoint, params);
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error('❌ API Error:', data.error);
        throw new Error(data.error.message);
      }
      
      // Salva no cache
      this.cache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });
      
      return data;

    } catch (error) {
      console.error('❌ Request error:', error.message);
      
      // Tenta usar cache se disponível
      if (this.cache.has(cacheKey)) {
        console.log('🔄 Usando cache devido a erro');
        return this.cache.get(cacheKey).data;
      }
      
      throw error;
    }
  }

  async getChannelId() {
    if (this.channelId) return this.channelId;

    try {
      console.log('🔍 Buscando Channel ID para:', this.channelHandle);
      
      const data = await this.makeRequest('search', {
        q: this.channelHandle,
        type: 'channel',
        part: 'snippet',
        maxResults: 1
      });

      if (data.items && data.items.length > 0) {
        this.channelId = data.items[0].id.channelId;
        console.log('✅ Channel ID encontrado:', this.channelId);
        return this.channelId;
      }
      
      throw new Error('Channel não encontrado');
      
    } catch (error) {
      console.error('❌ Erro ao buscar Channel ID:', error);
      return 'UC3H6tDu1TJXDIxrwU1WV9fQ';
    }
  }

  // Buscar lives PROGRAMADAS
  async getUpcomingLiveStreams() {
    try {
      const channelId = await this.getChannelId();
      console.log('📅 Buscando lives programadas...');
      
      const data = await this.makeRequest('search', {
        channelId: channelId,
        eventType: 'upcoming',
        type: 'video',
        maxResults: 3,
        order: 'date',
        part: 'snippet'
      });

      console.log('📅 Resultado lives programadas:', data);
      
      if (data.items && data.items.length > 0) {
        console.log(`🎯 Encontradas ${data.items.length} lives programadas:`);
        
        // Busca detalhes das lives programadas
        const liveIds = data.items.map(item => item.id.videoId).join(',');
        const liveDetails = await this.makeRequest('videos', {
          id: liveIds,
          part: 'liveStreamingDetails,snippet'
        });

        const upcomingLives = data.items.map(item => {
          const liveDetail = liveDetails.items.find(v => v.id === item.id.videoId);
          const scheduledTime = liveDetail?.liveStreamingDetails?.scheduledStartTime;
          
          return {
            id: item.id.videoId,
            videoId: item.id.videoId,
            titulo: item.snippet.title,
            descricao: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            dataProgramada: scheduledTime ? new Date(scheduledTime) : new Date(item.snippet.publishedAt),
          };
        });

        // Ordena por data mais próxima
        return upcomingLives.sort((a, b) => a.dataProgramada - b.dataProgramada);
        
      } else {
        console.log('📅 Nenhuma live programada encontrada');
        return [];
      }
    } catch (error) {
      console.error('❌ Erro ao buscar lives programadas:', error);
      return [];
    }
  }

  // Buscar vídeos com dados REAIS
  async getRecentVideos(limit = 6) {
    try {
      const channelId = await this.getChannelId();
      console.log('📹 Buscando vídeos do channel:', channelId);

      // Busca TODOS os vídeos
      const searchData = await this.makeRequest('search', {
        channelId: channelId,
        type: 'video',
        maxResults: limit + 5,
        order: 'date',
        part: 'snippet'
      });

      console.log('📊 Resultado da busca:', searchData);

      if (!searchData.items || searchData.items.length === 0) {
        console.log('⚠️ Nenhum vídeo encontrado na API');
        return this.getFallbackVideos(limit);
      }

      // FILTRA: remove lives programadas
      const publishedVideos = searchData.items.filter(item => 
        item.snippet.liveBroadcastContent !== 'upcoming'
      );

      console.log(`🎯 ${publishedVideos.length} vídeos publicados após filtrar:`);

      if (publishedVideos.length === 0) {
        console.log('⚠️ Nenhum vídeo publicado encontrado');
        return this.getFallbackVideos(limit);
      }

      // Pega os IDs para buscar detalhes
      const videoIds = publishedVideos.map(item => item.id.videoId).join(',');
      
      // Busca detalhes REAIS dos vídeos
      const videosDetails = await this.makeRequest('videos', {
        id: videoIds,
        part: 'contentDetails,statistics,snippet'
      });

      // Processa os vídeos com dados REAIS
      const videos = await Promise.all(
        publishedVideos.slice(0, limit).map(async (item, index) => {
          try {
            const videoDetail = videosDetails.items.find(v => v.id === item.id.videoId);
            
            // Extrai data do título
            const dateFromTitle = this.extractDateFromTitle(item.snippet.title);
            const videoDate = dateFromTitle || new Date(item.snippet.publishedAt);
            
            return {
              id: item.id.videoId,
              videoId: item.id.videoId,
              titulo: item.snippet.title,
              descricao: item.snippet.description,
              thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
              data: this.formatDate(videoDate),
              duracao: videoDetail?.contentDetails?.duration || 'PT1H0M',
              duracaoLegivel: this.formatDuration(videoDetail?.contentDetails?.duration) || '1:00:00',
              visualizacoes: videoDetail?.statistics?.viewCount || '0',
              foiLive: item.snippet.liveBroadcastContent === 'none' ? false : true,
              isShort: this.isShortVideo(item.snippet.title, item.snippet.description),
              publishedAt: item.snippet.publishedAt
            };
          } catch (error) {
            console.error('❌ Erro ao processar vídeo:', error);
            return this.createBasicVideo(item);
          }
        })
      );

      // Ordena por data de publicação
      const sortedVideos = videos.sort((a, b) => 
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      console.log('✅ Vídeos PUBLICADOS processados:', sortedVideos);
      return sortedVideos;

    } catch (error) {
      console.error('❌ Erro ao buscar vídeos:', error);
      return this.getFallbackVideos(limit);
    }
  }

  // Extrai data do título do vídeo
  extractDateFromTitle(title) {
    try {
      const datePatterns = [
        /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, // 24/09/2025
        /\b(\d{1,2})\/(\d{1,2})\/(\d{2})\b/, // 24/09/25
      ];

      for (const pattern of datePatterns) {
        const match = title.match(pattern);
        if (match) {
          const [_, day, month, year] = match;
          const fullYear = year.length === 2 ? `20${year}` : year;
          return new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        }
      }
      
      return null;
    } catch (error) {
      console.error('❌ Erro ao extrair data do título:', error);
      return null;
    }
  }

  // Formata data para PT-BR
  formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    
    const adjustedDate = new Date(date.getTime() + (3 * 60 * 60 * 1000)); // Ajuste UTC-3
    return adjustedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Verifica se é um Short
  isShortVideo(title, description) {
    return title.includes('#shorts') || 
           description.includes('#shorts') ||
           title.toLowerCase().includes('short');
  }

  // Formata duração
  formatDuration(duration) {
    if (!duration || duration === 'P0D') return '0:00';
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '1:00:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');

    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    } else if (minutes) {
      return `${minutes}:${seconds.padStart(2, '0')}`;
    } else {
      return `0:${seconds.padStart(2, '0')}`;
    }
  }

  // Cria vídeo básico
  createBasicVideo(item) {
    const dateFromTitle = this.extractDateFromTitle(item.snippet.title);
    const videoDate = dateFromTitle || new Date(item.snippet.publishedAt);

    return {
      id: item.id.videoId,
      videoId: item.id.videoId,
      titulo: item.snippet.title,
      descricao: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      data: this.formatDate(videoDate),
      duracao: 'PT1H0M',
      duracaoLegivel: '1:00:00',
      visualizacoes: '0',
      foiLive: false,
      isShort: this.isShortVideo(item.snippet.title, item.snippet.description),
      publishedAt: item.snippet.publishedAt
    };
  }

  async getLiveStreams() {
    try {
      const channelId = await this.getChannelId();
      
      const data = await this.makeRequest('search', {
        channelId: channelId,
        eventType: 'live',
        type: 'video',
        maxResults: 1,
        order: 'date',
        part: 'snippet'
      });

      console.log('🔴 Resultado live:', data);
      
      if (data.items && data.items.length > 0) {
        console.log('🎯 Live encontrada:', data.items[0].snippet.title);
        return data;
      } else {
        console.log('📡 Nenhuma live ativa');
        return { items: [] };
      }
    } catch (error) {
      console.error('❌ Erro ao buscar lives:', error);
      return { items: [] };
    }
  }

  getFallbackVideos(limit = 6) {
    console.log('🔄 Usando fallback');
    
    const fallbackVideos = [
      {
        id: 'video1',
        titulo: 'Congresso do Círculo de Oração - Colunas de Fé',
        data: '25 Jul 2025',
        videoId: 'rT8YqGItaR0',
        thumbnail: 'https://img.youtube.com/vi/rT8YqGItaR0/hqdefault.jpg',
        duracao: '2:07:55',
        visualizacoes: '131',
        duracaoLegivel: '2:07:55',
        foiLive: true
      },
      {
        id: 'video2', 
        titulo: 'Congresso de Jovens (Dia 02)',
        data: '24 Mai 2025',
        videoId: 'QQc8996nOvM',
        thumbnail: 'https://img.youtube.com/vi/QQc8996nOvM/hqdefault.jpg',
        duracao: '2:52:45',
        visualizacoes: '131',
        duracaoLegivel: '2:52:45',
        foiLive: true
      },
      {
        id: 'video3',
        titulo: 'Culto de Ação de Graça',
        data: '16 Ago 2025',
        videoId: '1U0T3ZFEI3w',
        thumbnail: 'https://img.youtube.com/vi/1U0T3ZFEI3w/hqdefault.jpg',
        duracao: '3:31:40',
        visualizacoes: '98',
        duracaoLegivel: '3:31:40',
        foiLive: true
      },
      {
        id: 'video4',
        titulo: 'Congresso Infantil - Dia 02',
        data: '21 Jun 2025',
        videoId: 'WFS8EDhs9iw',
        thumbnail: 'https://img.youtube.com/vi/WFS8EDhs9iw/hqdefault.jpg',
        duracao: '2:13:30',
        visualizacoes: '91',
        duracaoLegivel: '2:13:30',
        foiLive: true
      },
      {
        id: 'video5',
        titulo: '14° Aniversário da Igreja | Dia 01',
        data: '16 Nov 2024',
        videoId: '4vmylFlIL20',
        thumbnail: 'https://img.youtube.com/vi/4vmylFlIL20/hqdefault.jpg',
        duracao: '2:35:25',
        visualizacoes: '77',
        duracaoLegivel: '2:35:25',
        wasLive: true
      },
      {
        id: 'video6',
        titulo: 'Culto de Missão',
        data: '14 Set 2025',
        videoId: 'KOaB1TWnT2w',
        thumbnail: 'https://img.youtube.com/vi/KOaB1TWnT2w/hqdefault.jpg',
        duracao: '2:26:40',
        visualizacoes: '94',
        duracaoLegivel: '2:26:40',
        foiLive: true
      }
    ];
    return fallbackVideos.slice(0, limit);
  }
}

export default new YouTubeService();