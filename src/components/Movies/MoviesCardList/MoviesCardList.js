import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {  SCREEN } from '../../../utils/config.global';
import { ScreenTypeContext } from '../../../contexts/ScreenTypeContext';
import More from '../../More/More'
import Loader from '../../Loader/Loader';

function MoviesCardList({ movies, savedMovies, searchStatus, onSave, onRemove }) {
  const screenType = useContext(ScreenTypeContext);
  const [isMoreButton, setMoreButton] = useState(false);
  const [isRenderingMore, setRenderingMore] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const paginationDebounce = useRef(null);
  const path = useLocation().pathname;
  const isSavedMoviesPage = path === '/saved-movies';

  useEffect(() => {
    setMoreButton(!isSavedMoviesPage);
  }, [path, isSavedMoviesPage]);

  useEffect(() => {
    const calculateRenderCount = () => {
      const baseRenderCount = SCREEN[screenType].render;
      const additionalRenderCount = SCREEN[screenType].more * page;
      setRenderCount(baseRenderCount + additionalRenderCount);
    };

    calculateRenderCount();
  }, [page, screenType]);

  useEffect(() => {
    const isMoreButtonVisible = movies.length > renderCount;
    setMoreButton(isMoreButtonVisible);
  }, [movies, renderCount]);

  const incrementPage = () => {
    paginationDebounce.current = clearTimeout(paginationDebounce.current);
    setRenderingMore(true);
    paginationDebounce.current = setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setRenderingMore(false);
    }, 500);
  };

  const isLiked = (movie) => {
    if (savedMovies.length === 0) {
      return false;
    }

    return savedMovies.some((item) => {
      if (item.movieId === movie.id) {
        movie._id = item._id;
        return true;
      }
      return false;
    });
  };

  const renderMovies = () => {
    return movies.slice(0, renderCount).map((movie) => (
      <MoviesCard
        key={movie.movieId || movie.id}
        movie={movie}
        isLiked={isLiked(movie)}
        isSavedMoviesPage={isSavedMoviesPage}
        onSave={onSave}
        onRemove={onRemove}
      />
    ));
  };

  return (
    searchStatus.isLoading ? <Loader /> :
      <>
        {searchStatus.isError
          ? <div className="movies-content__error-wrapper">
            {searchStatus.message === 'Найдите фильм себе по душе'}
            <h2 className="movies-content__error">{searchStatus.message}</h2>
          </div>

          : <ul className="movies-cardlist">
            {renderMovies()}
          </ul>
        }
        {isMoreButton && !isRenderingMore && !searchStatus.isError &&
          <More onClick={incrementPage} />
        }
        {isRenderingMore && <Loader />}
      </>
  );
}

export default MoviesCardList;
