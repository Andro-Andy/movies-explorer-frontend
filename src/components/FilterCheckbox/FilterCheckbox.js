import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checked, onChange }) {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      <label className='checkbox__label' htmlFor='checkbox' />
      <span className='checkbox__capture'>Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;