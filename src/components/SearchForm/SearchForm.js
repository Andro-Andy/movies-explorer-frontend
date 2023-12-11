import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const [movieTitle, setMovieTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Movie title:', movieTitle);
  };

  return (
    <>
      <form className="search-form">
        <div className='serch-form__border'>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            required
          />
          <button className="search-form__button" type="submit" >Поиск</button>
        </div>
        <FilterCheckbox />

      </form>
    </>
  );
}

export default SearchForm;
