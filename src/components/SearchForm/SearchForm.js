import React, { useEffect, useState } from 'react';
import SearchIcon from '../../images/icon/icon-find.svg';
import { useLocation } from 'react-router-dom';
import { ROUTER, SEARCH_KEY } from '../../utils/config.global';
import './SearchForm.css';

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
      return setTimeout(() => setError(false), 700);
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
        <img
          className="search-form__icon"
          src={SearchIcon}
          alt="Иконка поиска в виде лупы"
        />
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          onChange={handleChange}
          value={query.string}
          required
        />
        <button className="search-form__button" type="submit" />
      </form>
      <label className="search-form__label">
        <input
          type="checkbox"
          className="search-form__checkbox"
          checked={query.isShort}
          onChange={handleChangeCheckbox}
        />
        <span className="search-form__checkbox-span" />
        <p className="search__checkbox-caption">Короткометражки</p>
      </label>
    </>
  );

}

export default SearchForm;
