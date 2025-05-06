import React, { useState } from 'react';
import './RegistrationForm.css';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    setRegistrationError('');

    if (!name || !email || !password || !confirmPassword) {
      setRegistrationError('Пожалуйста, заполните все поля.');
      return;
    }

    if (password !== confirmPassword) {
      setRegistrationError('Пароли не совпадают.');
      return;
    }

    // Временное сохранение данных (НЕ ДЛЯ ПРОДАКШЕНА!)
    localStorage.setItem('registeredUserEmail', email);
    localStorage.setItem('registeredUserPassword', password);
    alert('Регистрация прошла успешно!');
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <div className="registration-page">
      <h2 className="registration-title">Регистрация</h2>
      {registrationError && <p className="error-message">{registrationError}</p>}
      <form className="registration-form" onSubmit={handleRegistrationSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input type="text" id="name" className="form-control" placeholder="Введите имя" value={name} onChange={handleNameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" placeholder="Введите email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" className="form-control" placeholder="Введите пароль" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль:</label>
          <input type="password" id="confirmPassword" className="form-control" placeholder="Подтвердите пароль" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        <button type="submit" className="register-button">Зарегистрироваться</button>
        <p className="login-link">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </form>
    </div>
  );
}

export default RegistrationForm;