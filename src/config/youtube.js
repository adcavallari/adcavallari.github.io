const getApiKeys = () => {
  const keys = [
    process.env.REACT_APP_YOUTUBE_API_KEY_1,
    process.env.REACT_APP_YOUTUBE_API_KEY_2, 
    process.env.REACT_APP_YOUTUBE_API_KEY_3,
    process.env.REACT_APP_YOUTUBE_API_KEY_4,
    process.env.REACT_APP_YOUTUBE_API_KEY_5,
  ];
  
  // Filtra apenas keys válidas (não undefined, null ou strings vazias)
  const validKeys = keys.filter(key => 
    key && 
    key !== 'SUA_SEGUNDA_API_KEY_AQUI' && 
    key.startsWith('AIza')
  );
  
  console.log('🔑 API Keys carregadas:', validKeys.length);
  
  if (validKeys.length === 0) {
    console.warn('⚠️ Nenhuma API Key válida encontrada no .env');
  }
  
  return validKeys;
};

const config = {
  youtube: {
    apiKeys: getApiKeys()
  }
};

export default config;