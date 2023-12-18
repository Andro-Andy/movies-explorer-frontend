import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Logo from '../Logo/Logo';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { REGEXP_EMAIL, ROUTER } from '../../utils/config.global';
import Loader from '../Loader/Loader';

import './Auth.css';

function Auth({ type, onLogin, onRegister, reqStatus }) {
  const { values, errors, setErrors, isValid, setValid, handleChange } = useFormAndValidation();
  const { isLogged } = useContext(CurrentUserContext);

  const renderTitle = {
    register: <h1 className={`${type}__title`}>Добро пожаловать!</h1>,
    login: <h1 className={`${type}__title`}>Рады видеть!</h1>,
  };

  const renderButton = {
    register: (
      <button
        type="submit"
        className={`${type}__button`}
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
    ),
    login: (
      <button
        type="submit"
        className={`${type}__button`}
        disabled={!isValid}
      >
        Войти
      </button>
    ),
  };

  const renderCaption = {
    register: (
      <p className={`${type}__caption`}>
        Уже зарегистрированы?{' '}
        <Link to={type === 'register' ? '/signin' : '/signup'} className={`${type}__caption-link`}>
          {type === 'register' ? 'Войти' : 'Регистрация'}
        </Link>
      </p>
    ),
    login: (
      <p className={`${type}__caption`}>
        Ещё не зарегистрированы?{' '}
        <Link to={type === 'register' ? '/signin' : '/signup'} className={`${type}__caption-link`}>
          {type === 'register' ? 'Войти' : 'Регистрация'}
        </Link>
      </p>
    ),
  };

  const handleChangeEmail = (evt) => {
    handleChange(evt);

    const { name, value } = evt.target;

    if (name === 'email' && !REGEXP_EMAIL.test(value)) {
      setValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Формат почты: name@gmail.com',
      }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (type === 'login') {
      onLogin({
        email: values.email,
        password: values.password,
      });
    } else {
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    }
  };

  return !isLogged ? (
    <section className={`${type} auth`}>
      <Logo />
      {renderTitle[type]}
      <form className={`${type}__form auth__form`} onSubmit={handleSubmit}>
        {type === 'register' && (
          <>
            <label className="auth__label">
              <input
                id="name"
                name="name"
                type="text"
                className={`auth__input ${errors.name && 'auth__input_type_invalid'}`}
                onChange={handleChange}
                value={values.name ?? ''}
                minLength={2}
                maxLength={30}
                required
              />
              <span className="auth__span">Имя:</span>
            </label>
            <span id="name-error" className="auth__error">
              {errors.name}
            </span>
          </>
        )}
        <label className="auth__label">
          <input
            id="email"
            name="email"
            type="email"
            className={`auth__input ${errors.email && 'auth__input_type_invalid'}`}
            value={values.email ?? ''}
            onChange={handleChangeEmail}
            required
          />
          <span className="auth__span">E-mail:</span>
        </label>

        <span id="email-error" className="auth__error">
          {errors.email}
        </span>
        <label className="auth__label">
          <input
            id="password"
            name="password"
            type="password"
            className={`auth__input ${errors.password && 'auth__input_type_invalid'}`}
            value={values.password ?? ''}
            onChange={handleChange}
            minLength={6}
            required
          />
          <span className="auth__span">Пароль:</span>
        </label>
        <span id="password-error" className="auth__error">
          {errors.password}
        </span>
        {reqStatus.isLoading ? <Loader /> : renderButton[type]}
      </form>
      {renderCaption[type]}
    </section>
  ) : (
    <Navigate to={ROUTER.movies} replace={true} />
  );
}

export default Auth;
