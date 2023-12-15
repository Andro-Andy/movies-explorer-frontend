import React, { useEffect, useState } from 'react';
// import SearchIcon from '../../images/icon/icon-find.svg';
import { useLocation } from 'react-router-dom';
import { ROUTER, SEARCH_KEY } from '../../utils/config.global';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
function SearchForm({ onSubmit, savedQuery }) {
  const path = useLocation().pathname;
  const isMoviesPage = path === ROUTER.movies;
  const [query, setQuery] = useState({
    string: savedQuery.string,
    isShort: savedQuery.isShort,
  });
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (isMoviesPage && SEARCH_KEY in localStorage) {
      setQuery(JSON.parse(localStorage.getItem(SEARCH_KEY)));
    }
  }, [isMoviesPage]);

  const handleChange = (evt) => {
    setQuery((query) => ({ ...query, string: evt.target.value }));
  };

  const handleChangeCheckbox = (evt) => {
    if (!query.string && isMoviesPage) {
      setError(true);
      return setTimeout(() => setError(true), 700);
    }
    setQuery((query) => ({ ...query, isShort: evt.target.checked }));
    onSubmit({ string: query.string, isShort: evt.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <>
      <form className={`search-form ${isError && 'search-form_type_error'}`} onSubmit={handleSubmit}>
        <div className='serch-form__border'>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value={query.string}
            onChange={handleChange}
            required
          />
          <button className="search-form__button" type="submit" >Поиск</button>
        </div>
        <FilterCheckbox checked={query.isShort} onChange={handleChangeCheckbox} />
      </form>
    </>
  );

}

export default SearchForm;
