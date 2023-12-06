import React, { useState } from 'react';
import classnames from 'classnames';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleButtonClick = () => {
    setIsSaved(prevIsSaved => !prevIsSaved);
  };

  const saveButtonClass = classnames('movies-card__save', {
    'movies-card__save-active': movie.isLiked && isSaved,
  });

  return (
    <div className='movies-card'>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.title}</h2>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
      <img src={movie.imageUrl} alt={movie.title} className="movies-card__image" />
      <button className={saveButtonClass} onClick={handleButtonClick}>
        {isSaved ? null : 'Сохранить'}
      </button>
    </div>
  );
}

export default MoviesCard;
