import React, { useState, useEffect } from 'react';
import './AddNewsForm.css';

function AddNewsForm({ onAddNews, editingArticle }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title);
      setCategory(editingArticle.category);
      setContent(editingArticle.content);
      // Обложку при редактировании пока не будем загружать заново
    } else {
      setTitle('');
      setCategory('');
      setCover(null);
      setContent('');
    }
  }, [editingArticle]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && category && content) {
      const updatedArticle = {
        id: editingArticle ? editingArticle.id : Date.now(),
        title,
        category,
        cover: cover ? cover : editingArticle ? editingArticle.imageUrl : null, // Сохраняем существующий URL, если не выбран новый файл
        content,
        date: editingArticle ? editingArticle.date : new Date().toLocaleDateString(),
        author: editingArticle ? editingArticle.author : { initial: 'U', name: 'Пользователь' },
      };
      onAddNews(updatedArticle);
    } else {
      alert('Пожалуйста, заполните название, категорию и контент.');
    }
  };

  return (
    <div className="add-news-form-redesigned">
      <h2>{editingArticle ? 'Редактирование новости' : 'Создание новости'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <select id="category" value={category} onChange={handleCategoryChange} required>
            <option value="">Выберите категорию</option>
            <option value="спорт">Спорт</option>
            <option value="политика">Политика</option>
            <option value="технологии">Технологии</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cover">Обложка:</label>
          <input type="file" id="cover" onChange={handleCoverChange} />
          {cover && <p>Выбран файл: {cover.name}</p>}
          {editingArticle && editingArticle.imageUrl && !cover && <img src={editingArticle.imageUrl} alt="Обложка" style={{ maxWidth: '100px', marginTop: '10px' }} />}
        </div>
        <div className="form-group">
          <label htmlFor="content">Контент:</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <button type="submit" className="add-button">{editingArticle ? 'Сохранить изменения' : 'Добавить новость'}</button>
      </form>
    </div>
  );
}

export default AddNewsForm;