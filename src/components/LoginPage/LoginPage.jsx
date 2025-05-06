import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoginError('');

    const storedEmail = localStorage.getItem('registeredUserEmail');
    const storedPassword = localStorage.getItem('registeredUserPassword');

    if (email === storedEmail && password === storedPassword) {
      console.log('Успешная авторизация!');
      alert('Вход выполнен!');
      onLogin(); // Вызываем функцию onLogin, переданную из App
    } else {
      setLoginError('Неверный email или пароль.');
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Войти в аккаунт</h2>
      {loginError && <p className="error-message">{loginError}</p>}
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Введите email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Войти</button>
      </form>
      <p className="register-link">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default LoginPage;