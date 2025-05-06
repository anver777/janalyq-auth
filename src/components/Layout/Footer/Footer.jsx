import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} JANALYQ. Все права защищены.</p>
        <nav className="footer-navigation">
          <ul>
            <li><a href="/about">О нас</a></li>
            <li><a href="/contact">Контакты</a></li>
            <li><a href="/privacy">Политика конфиденциальности</a></li>
            <li><a href="/terms">Условия использования</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;