import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsList.css';

function NewsList({ articles, onDeleteNews, onEdit }) {
  return (
    <div className="news-list">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} onDelete={onDeleteNews} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default NewsList;