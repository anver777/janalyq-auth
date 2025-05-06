import React from 'react';
import './NewsCard.css';

function NewsCard({ article, onDelete, onEdit }) {
  const { title, imageUrl, date, category, author, id } = article;
  const isLoggedIn = localStorage.getItem('registeredUserEmail') !== null;

  const handleDeleteClick = () => {
    if (onDelete && isLoggedIn) {
      onDelete(id);
    } else if (!isLoggedIn) {
      alert('Вы должны быть авторизованы, чтобы удалять новости.');
    }
  };

  const handleEditClick = () => {
    console.log('Кнопка "Редактировать" нажата', article);
    if (onEdit && isLoggedIn) {
      onEdit(article);
    } else if (!isLoggedIn) {
      alert('Вы должны быть авторизованы, чтобы редактировать новости.');
    }
  };

  return (
    <div className="news-card">
      {imageUrl && <img src={imageUrl} alt={title} className="news-image" />}
      <div className="news-info">
        <h3 className="news-title">{title}</h3>
        <p className="news-meta">
          {date} • {category}
        </p>
        <div className="news-actions">
          <button className="edit-button" onClick={handleEditClick}>Редактировать</button>
          <button className="delete-button" onClick={handleDeleteClick}>Удалить</button>
        </div>
        <div className="news-author">
          <span>{author.initial}</span> {author.name}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;