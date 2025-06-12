import { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import NewsForm from './components/NewsForm';
import './App.css';

const App = () => {
  // 1. ИНИЦИАЛИЗАЦИЯ СОСТОЯНИЯ: загружаем данные из Local Storage при первом рендере
  const [news, setNews] = useState(() => {
    try {
      // Пытаемся получить данные из Local Storage
      const savedData = localStorage.getItem('news');
      // Если данные есть - парсим их, иначе возвращаем пустой массив
      return savedData ? JSON.parse(savedData) : [];
    } catch (e) {
      // Обработка ошибок парсинга
      console.error("Ошибка загрузки данных:", e);
      return [];
    }
  });
  
  // 2. СОСТОЯНИЕ ДЛЯ РЕДАКТИРОВАНИЯ: храним текущую редактируемую новость
  const [currentNews, setCurrentNews] = useState(null);

  // 3. СОХРАНЕНИЕ ДАННЫХ: автоматически сохраняем при любом изменении news
  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  // 4. ДОБАВЛЕНИЕ НОВОСТИ
  const addNews = (newsItem) => {
    const newNews = {
      ...newsItem,
      id: Date.now()// Генерируем уникальный ID

    };
    // Используем функциональное обновление для безопасности
    setNews(prev => [...prev, newNews]);
  };

  // 5. ОБНОВЛЕНИЕ НОВОСТИ
  const updateNews = (updatedNews) => {
    setNews(prev => 
      prev.map(item => item.id === updatedNews.id ? updatedNews : item)
    );
    setCurrentNews(null); // Сбрасываем редактирование
  };

  // 6. УДАЛЕНИЕ НОВОСТИ
  const deleteNews = (id) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  // 7. ЗАПУСК РЕДАКТИРОВАНИЯ
  const editNews = (newsItem) => {
    setCurrentNews(newsItem);
  };

  // 8. ОТМЕНА РЕДАКТИРОВАНИЯ
  const cancelEdit = () => {
    setCurrentNews(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Управление новостями</h1>
      </header>
      
      <main>
        {/* 9. ФОРМА ДЛЯ ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ */}
        <NewsForm 
          addNews={addNews} 
          updateNews={updateNews} 
          currentNews={currentNews}
          onCancel={cancelEdit} 
        />
        
        {/* 10. СПИСОК НОВОСТЕЙ */}
        <NewsList 
          news={news} 
          deleteNews={deleteNews} 
          editNews={editNews} 
        />
      </main>
    </div>
  );
}

export default App;