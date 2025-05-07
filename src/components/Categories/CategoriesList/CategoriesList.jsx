import React, { useState, useEffect } from 'react';
import './CategoriesList.css';


function CategoriesList({ onAddCategoryClick, updateFlag }) {
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, [updateFlag]);

  const handleDeleteCategory = (indexToDelete) => {
    const updatedCategories = categories.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  console.log('Пропс onAddCategoryClick в CategoriesList:', onAddCategoryClick);

  return (
    <div className="categories-list">
      <h2>Категории</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button>Редактировать</button>
            <button onClick={() => handleDeleteCategory(index)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={onAddCategoryClick} className="add-category-button">+</button>
    </div>
  );
}

export default CategoriesList;