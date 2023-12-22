import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import headerLogoProfile from '../../images/icon/profile.svg';
import './Navigation.css';
import cn from 'classnames';


function Navigation({ burger, setBurger }) {
  const handleClick = () => {
    setBurger(false);
  };

  const navLinks = [
    { to: '/movies', text: 'Фильмы' },
    { to: '/saved-movies', text: 'Сохраненные фильмы' },
  ];

  return (
    <section className={cn('header__navigation', { 'burger-active': burger })}>
      <button onClick={() => setBurger(false)} className="header__close-burger"></button>
      <nav className="header__menu">
        <ul className="header__links">
          {navLinks.map(({ to, text }, index) => (
            <li key={index} className="header__item">
              <NavLink
                className={({ isActive }) => `header__link link ${isActive && 'underline'}`}
                to={to}
                onClick={handleClick}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link className="header__profile" to={'/profile'} onClick={handleClick}>
        <p className="header__link font link">Аккаунт</p>
        <img
          className="header__profile-icon"
          alt="Логотип в виде силуэта человека"
          src={headerLogoProfile}
        />
      </Link>
    </section>
  );
}

export default Navigation;
