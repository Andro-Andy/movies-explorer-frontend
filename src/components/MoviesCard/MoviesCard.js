import { MOVIES_URL } from '../../utils/config.global';
import './MoviesCard.css';

function MoviesCard({ movie, isLiked, isSavedMoviesPage, onSave, onRemove }) {
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursText = hours > 0 ? `${hours}ч` : '';
    const minutesText = minutes > 0 ? `${minutes}м` : '';

    return `${hoursText} ${minutesText}`;
  };

  const openTrailerLink = () => {
    window.open(`${movie.trailerLink}`);
  };

  const formatImage = () => {
    return isSavedMoviesPage ? movie.image : MOVIES_URL + movie.image.url;
  };

  return (
    <li className='movies-card'>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
      </div>
      <img
        src={formatImage()}
        alt={`Обложка фильма ${movie.nameRU}`}
        className="movies-card__image"
        onClick={openTrailerLink}
      />
      {isLiked && !isSavedMoviesPage && (
        <button
          className={`movies-card__save ${isLiked ? 'movies-card__save-active' : ''}`}
          onClick={() => onRemove(movie._id)}
        />
      )}
      {!isSavedMoviesPage && !isLiked && (
        <button className="movies-card__save" onClick={() => onSave(movie)}>
          Сохранить
        </button>
      )}
      {isSavedMoviesPage && (
        <button className="movies-card__save movies-card__delete" onClick={() => onRemove(movie._id)} />
      )}
    </li>
  );
}

export default MoviesCard;
