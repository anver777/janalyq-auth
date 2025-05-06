import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import NewsList from './components/News/NewsList/NewsList';
import AddNewsForm from './components/News/AddNewsForm/AddNewsForm';
import CategoriesList from './components/Categories/CategoriesList/CategoriesList';
import AddCategoryForm from './components/Categories/AddCategoryForm/AddCategoryForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [news, setNews] = useState(() => {
    const storedNews = localStorage.getItem('news');
    return storedNews ? JSON.parse(storedNews) : [];
  });
  const [categoryUpdateFlag, setCategoryUpdateFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('registeredUserEmail');
    const storedPassword = localStorage.getItem('registeredUserPassword');
    if (storedEmail && storedPassword) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAddingNews(false);
    setIsEditingNews(false);
    setEditingArticle(null);
    localStorage.removeItem('registeredUserEmail');
    localStorage.removeItem('registeredUserPassword');
    navigate('/login');
  };

  const handleAddNews = (newArticleData) => {
    const imageUrl = newArticleData.cover ? URL.createObjectURL(newArticleData.cover) : '';
    const newArticle = {
      id: Date.now(),
      title: newArticleData.title,
      category: newArticleData.category,
      imageUrl: imageUrl,
      content: newArticleData.content,
      date: newArticleData.date,
      author: newArticleData.author,
    };
    setNews([newArticle, ...news]);
    setIsAddingNews(false);
  };

  const handleDeleteNews = (newsId) => {
    setNews(news.filter(article => article.id !== newsId));
  };

  const handleEditNews = (articleToEdit) => {
    setEditingArticle(articleToEdit);
    setIsEditingNews(true);
  };

  const handleUpdateNews = (updatedArticleData) => {
    const originalArticle = news.find(article => article.id === updatedArticleData.id);
    let updatedImageUrl = originalArticle?.imageUrl || '';

    if (updatedArticleData.cover instanceof File) {
      updatedImageUrl = URL.createObjectURL(updatedArticleData.cover);
    }

    const updatedArticle = {
      ...updatedArticleData,
      imageUrl: updatedImageUrl,
    };
    const updatedNews = news.map(article =>
      article.id === updatedArticleData.id ? updatedArticle : article
    );
    setNews(updatedNews);
    setIsEditingNews(false);
    setEditingArticle(null);
  };

  const toggleAddNewsForm = () => {
    setIsAddingNews(!isAddingNews);
  };

  const forceCategoryListUpdate = () => {
    setCategoryUpdateFlag(!categoryUpdateFlag);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} onAddClick={toggleAddNewsForm} />
      <div className="container">
        {isLoggedIn && isAddingNews ? (
          <AddNewsForm onAddNews={handleAddNews} />
        ) : isLoggedIn && isEditingNews && editingArticle ? (
          <AddNewsForm onAddNews={handleUpdateNews} editingArticle={editingArticle} />
        ) : (
          <Routes>
            <Route path="/" element={<NewsList articles={news} onDeleteNews={handleDeleteNews} onEdit={handleEditNews} />} />
            <Route path="/category/:category" element={<div>Страница категории</div>} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/categories" element={<CategoriesList updateFlag={categoryUpdateFlag} onAddCategoryClick={() => navigate('/categories/add')} />} />
            <Route path="/categories/add" element={<AddCategoryForm onCategoryAdded={forceCategoryListUpdate} />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;