import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './Register.css';

function Register({ setViewHeader }) {
  useEffect(() => {
    setViewHeader(false);
  }, []);
  return (
    <section className="register login">
      <Logo />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <label htmlFor="name" className="register__label">
          Имя
        </label>
        <input
          id="name"
          type="text"
          className="register__input"
          defaultValue={'Виталий'}
          required
        />
        <label htmlFor="email" className="register__label">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="register__input"
          defaultValue={'pochta@yandex.ru'}
          required
        />
        <label htmlFor="password" className="register__label">
          Пароль
        </label>
        <input
          htmlFor="password"
          type="password"
          className="register__input"
          required
        />
        <button type="submit" className="register__register-button">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__login">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
