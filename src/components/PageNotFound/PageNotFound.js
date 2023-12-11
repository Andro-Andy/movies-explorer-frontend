import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound({ setViewHeader }) {
  const navigate = useNavigate();

  useEffect(() => {
    setViewHeader(false);
  }, []);


  const goBackToMain = () => {
    navigate('/');
  };

  return (
    <section className="page-not-found">
      <h1 className='page-not-found__title'>404</h1>
      <p className='page-not-found__text'>Страница не найдена</p>
      <button className='page-not-found__link-back' onClick={goBackToMain}>
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;
