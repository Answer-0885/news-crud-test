// src/components/NewsItem.jsx
const NewsItem = function ({ 
  item,        // Объект новости для отображения
  deleteNews,  // Функция удаления новости
  editNews     // Функция запуска редактирования
}) {
  return (
    // 1. КАРТОЧКА НОВОСТИ
    <div className="news-card">
      {/* 2. ОБЛАСТЬ С КОНТЕНТОМ */}
      <div className="news-content">
        {/* 3. ЗАГОЛОВОК НОВОСТИ */}
        <h3>{item.title}</h3>
        
        {/* 4. ТЕКСТ НОВОСТИ */}
        <p>{item.content}</p>
      </div>
      
      {/* 5. ОБЛАСТЬ С КНОПКАМИ ДЕЙСТВИЙ */}
      <div className="news-actions">
        {/* 6. КНОПКА РЕДАКТИРОВАНИЯ */}
        <button onClick={() => editNews(item)}>
          Редактировать
        </button>
        
        {/* 7. КНОПКА УДАЛЕНИЯ */}
        <button onClick={() => deleteNews(item.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default NewsItem;