import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArticleDetail.css';
import { articles } from '../data/data.js';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [readCount, setReadCount] = useState(0);

  useEffect(() => {
    const foundArticle = articles.find(article => article.id === parseInt(id, 10));
    setArticle(foundArticle);

    // Load read count from localStorage
    const savedCount = localStorage.getItem(`article-${id}-count`) || '0';
    setReadCount(parseInt(savedCount, 10));
  }, [id]);

  const handleReadClick = () => {
    const newCount = readCount + 1;
    setReadCount(newCount);
    localStorage.setItem(`article-${id}-count`, newCount.toString());
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="article-detail">
      <div className="article-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Lesson {article.lesson}: {article.title}</h1>
      </div>
      
      <div className="article-content">
        {article.content.map((sentence, index) => (
          <div key={index} className="sentence-card">
            <div className="english">{sentence.english}</div>
            <div className="chinese">{sentence.chinese}</div>
          </div>
        ))}
      </div>

      <div className="read-counter" onClick={handleReadClick}>
        <span>已读本课：第 {readCount} 遍</span>
        <span>请点击 +1</span>
      </div>
    </div>
  );
};

export default ArticleDetail;