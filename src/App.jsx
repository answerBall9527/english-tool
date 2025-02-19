import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { articles } from './data/data.js';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: '/home', icon: '📚', label: '百遍' },
    { path: '/square', icon: '😊', label: '广场' },
    { path: '/game', icon: '🎧', label: '你说我猜' },
    { path: '/discover', icon: '🔍', label: '发现' },
    { path: '/profile', icon: '👤', label: '我的' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <Link 
          to={item.path} 
          key={item.path} 
          className={`nav-item ${pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}


function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>精读百遍新概念</h1>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <div className="lesson-list">
              {articles.map(article => (
                <Link to={`/article/${article.id}`} key={article.id} className="lesson-card">
                  <span>{article.title}</span>
                  <span>{localStorage.getItem(`article-${article.id}-count`) || '0'}</span>
                </Link>
              ))}
            </div>
          } />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>

{/* {location.pathname === '/home' && <BottomNav />} */}
      </div>
    </Router>
  );
}

export default App;
