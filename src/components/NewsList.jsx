// src/components/NewsList.jsx
import NewsItem from './NewsItem';

const NewsList = function ({ 
  news,        // Массив новостей для отображения
  deleteNews,  // Функция удаления новости
  editNews     // Функция запуска редактирования новости
}) {
  // 1. ПРОВЕРКА НА ПУСТОЙ СПИСОК
  if (news.length === 0) {
    return <div className="no-news">Новостей пока нет</div>;
  }

  return (
    <div className="news-list">
      {/* 2. ЗАГОЛОВОК СПИСКА */}
      <h2>Список новостей</h2>
      
      {/* 3. СЕТКА ДЛЯ ОТОБРАЖЕНИЯ КАРТОЧЕК */}
      <div className="news-grid">
        {/* 4. ПЕРЕБОР ВСЕХ НОВОСТЕЙ */}
        {news.map(item => (
          <NewsItem
            key={item.id}        // Уникальный ключ для оптимизации рендеринга
            item={item}          // Данные новости
            deleteNews={deleteNews} 
            editNews={editNews} 
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;