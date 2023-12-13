import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/icon/logo-header.svg';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import './Header.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header() {
  const { isLogged } = useContext(CurrentUserContext);
  const location = useLocation();
  const [burger, setBurger] = useState(false);
  const hideAuthNavPaths = ['/movies', '/saved-movies'];
  const shouldHideAuthNav = hideAuthNavPaths.includes(location.pathname);

  useEffect(() => {
    if (isLogged) {
      setBurger(true);
    }
  }, [isLogged]);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link link">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип в виде латинской С в зеленом круге"
        />
      </Link>
      {isLogged && (
        <div onClick={() => setBurger(true)} className="header__burger"></div>
      )}
      {isLogged ? (
        <Navigation burger={burger} setBurger={setBurger} />
      ) : shouldHideAuthNav ? null : (
        <AuthNav />
      )}
    </header>
  );
}

export default Header;
