import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        id='checkbox'
      />
      <label className='checkbox__label' htmlFor='checkbox' />
      <span className='checkbox__capture'>Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;