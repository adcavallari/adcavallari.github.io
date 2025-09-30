import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';
import logob from '../../assets/logo_branca.png';
import logoa from '../../assets/logo_azul.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Carrega o tema salvo ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDarkMode(theme);
    applyTheme(theme);
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyTheme(newDarkMode);
  };

  // 🔥 NOVO: Define qual logo usar baseado no tema
  const currentLogo = isDarkMode ? logob : logoa;

  const navigationItems = [
    { path: '/', label: 'Início' },
    { path: '/transmissoes', label: 'Transmissões' },
    { path: '/ministerios', label: 'Ministérios' },
    { path: '/construcao', label: 'Novo Templo' },
    { path: '/contato', label: 'Contato' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              {/* 🔥 ATUALIZADO: Logo muda conforme o tema */}
              <img src={currentLogo} alt="AD Cavallari" className="logo-image" />
              <span className="logo-text">AD CAVALLARI</span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="nav-desktop">
            {navigationItems.map(item => {
              const active = isActive(item.path);
              console.log(`${item.label}: ${active}`);
              return(
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
            );
            })}
            
            {/* Botão Toggle Theme */}
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Mudar tema"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          {navigationItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          <button 
            className="theme-toggle mobile"
            onClick={toggleTheme}
          >
            {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;