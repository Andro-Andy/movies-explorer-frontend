import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthNav.css';

function AuthNav() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="header__nav">
      <button className="header__nav-btn" type="button" onClick={() => handleClick('/signup')}>
        Регистрация
      </button>
      <button
        className="header__nav-btn header__nav-btn_type_login"
        type="button"
        onClick={() => handleClick('/signin')}
      >
        Войти
      </button>
    </nav>
  );
}

export default AuthNav;
