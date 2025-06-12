// src/components/NewsForm.jsx
import { useState, useEffect } from 'react';

const NewsForm = function ({ 
  addNews,       // Функция для добавления новости
  updateNews,    // Функция для обновления новости
  currentNews,   // Текущая редактируемая новость (null если создание новой)
  onCancel       // Функция отмены редактирования
}) {
  // 1. СОСТОЯНИЯ ДЛЯ ПОЛЕЙ ФОРМЫ
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 2. ЭФФЕКТ ДЛЯ ЗАПОЛНЕНИЯ ФОРМЫ ПРИ РЕДАКТИРОВАНИИ
  useEffect(() => {
    if (currentNews) {
      // Если редактируем существующую новость - заполняем поля
      setTitle(currentNews.title);
      setContent(currentNews.content);
    } else {
      // Если создаем новую - очищаем поля
      setTitle('');
      setContent('');
    }
  }, [currentNews]);

  // 3. ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // 4. ПРОВЕРКА НА ПУСТЫЕ ПОЛЯ
    if (!title.trim() || !content.trim()) return;

    // 5. СОЗДАЕМ ОБЪЕКТ НОВОСТИ
    const newsItem = { title, content };
    
    // 6. ВЫБОР ДЕЙСТВИЯ: ОБНОВЛЕНИЕ ИЛИ ДОБАВЛЕНИЕ
    if (currentNews) {
      updateNews({ ...newsItem, id: currentNews.id }); // Обновляем с сохранением ID
    } else {
      addNews(newsItem); // Добавляем новую новость
    }

    // 7. СБРАСЫВАЕМ ФОРМУ ПОСЛЕ ОТПРАВКИ
    resetForm();
  };

  // 8. ФУНКЦИЯ СБРОСА ФОРМЫ
  const resetForm = () => {
    setTitle('');
    setContent('');
    // 9. ПРИ ОТМЕНЕ РЕДАКТИРОВАНИЯ СКРОЛЛИМ ВВЕРХ
    if (currentNews) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      {/* 10. ЗАГОЛОВОК ФОРМЫ В ЗАВИСИМОСТИ ОТ РЕЖИМА */}
      <h2>{currentNews ? 'Редактировать новость' : 'Добавить новость'}</h2>
      
      {/* 11. ПОЛЕ ДЛЯ ЗАГОЛОВКА */}
      <div className="form-group">
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      {/* 12. ПОЛЕ ДЛЯ СОДЕРЖАНИЯ */}
      <div className="form-group">
        <label>Содержание:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
        />
      </div>
      
      {/* 13. КНОПКИ ДЕЙСТВИЙ */}
      <div className="form-actions">
        {/* 14. КНОПКА ОТПРАВКИ (САБМИТ) */}
        <button type="submit">
          {currentNews ? 'Обновить' : 'Добавить'}
        </button>
        
        {/* 15. КНОПКА ОТМЕНЫ (ТОЛЬКО ПРИ РЕДАКТИРОВАНИИ) */}
        {currentNews && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;