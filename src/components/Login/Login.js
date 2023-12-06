import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

function Login({ setViewHeader }) {

  useEffect(() => {
    setViewHeader(false);
  }, []);

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  return (
    <section className="register login">
      <Logo />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <label htmlFor="email" className="login__label">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="login__input"
          htmlFor="email"
          value={'pochta@yandex.ru'}
          required
        />
        <label htmlFor="password" className="login__label">
          Пароль
        </label>
        <input
          htmlFor="password"
          type="password"
          className="login__input"
          required
        />
        <button type="submit" className="login__login-button">
          Войти
        </button>
      </form>
      <p className="login__login">
        Ещё не зарегистрированы?{' '}
        <Link to="/signup" className="login__login-link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
