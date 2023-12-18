import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import './Movies.css';
import { useFilter } from '../../hooks/useFilter';

function Movies({ movies, savedMovies, onSave, onRemove }) {
  const {
    filteredMovies,
    savedQuery,
    handleSubmit,
    searchStatus,
  } = useFilter({ movies, isSavedMoviesPage: false });


  return (
    <section className="movies-content">
      <SearchForm
        onSubmit={handleSubmit}
        savedQuery={savedQuery}
      />
      <MoviesCardList
        movies={filteredMovies}
        savedMovies={savedMovies}
        searchStatus={searchStatus}
        onSave={onSave}
        onRemove={onRemove}
      />
    </section>
  );
}

export default Movies;
