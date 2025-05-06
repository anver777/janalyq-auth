import React, { useState } from 'react';
import './AddCategoryForm.css';
import { useNavigate } from 'react-router-dom';

function AddCategoryForm({ onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      const storedCategories = localStorage.getItem('categories');
      const categories = storedCategories ? JSON.parse(storedCategories) : [];
      categories.push(categoryName);
      localStorage.setItem('categories', JSON.stringify(categories));
      setCategoryName('');
      navigate('/categories');
      if (onCategoryAdded) {
        onCategoryAdded();
      }
    } else {
      alert('Пожалуйста, введите название категории.');
    }
  };

  return (
    <div className="add-category-form">
      <h2>Создание категории</h2>
      <div className="form-group">
        <label htmlFor="categoryName">Название:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={handleInputChange}
          placeholder="Введите название категории"
        />
      </div>
      <button onClick={handleAddCategory} className="add-category-button">
        Добавить категорию
      </button>
    </div>
  );
}

export default AddCategoryForm;