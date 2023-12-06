import React from 'react';
import LogoHeader from '../../images/icon/logo-header.svg';
import './PromoHeader.css';

function PromoHeader() {
  const handleClick = () => {
    console.log('handleClick Регистрация');
  };

  return (
    <header className="promo__header">
      <img
        className="promo__header-logo"
        alt="Логотип в виде белой латинской буквы С "
        src={LogoHeader}
      />
      <div className="promo__navigation">
        <button
          className="promo__register-btn"
          type="button"
          onClick={handleClick}
        >
          Регистрация
        </button>
        <button
          className="promo__login-btn"
          type="button"
          onClick={handleClick}
        >
          Войти
        </button>
      </div>
    </header>
  );
}

export default PromoHeader;
