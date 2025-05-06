import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout, onAddClick }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">JANALYQ</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li className="news-menu-item"><button onClick={onAddClick}>Новости</button></li> {/* Добавили класс news-menu-item */}
          <li><Link to="/categories">Категории</Link></li>
        </ul>
      </nav>
      <div className="auth-links">
        {isLoggedIn ? (
          <>
            <button className="add-button" onClick={onAddClick}>+</button>
            <button className="logout-button" onClick={onLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login" className="login-button-header">Войти</Link>
        )}
      </div>
    </header>
  );
}

export default Header;