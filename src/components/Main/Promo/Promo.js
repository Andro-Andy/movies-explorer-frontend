import React from 'react';
import LandingLogo from '../../../images/icon/landing-logo.svg';
import './Promo.css';

function Promo() {
  return (
    <>
      <section className="section promo">
        <div className="promo__description">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <h2 className="promo__learn-more">
            Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
            создателя.
          </h2>
          <button className="promo__learn-btn">Узнать больше</button>
        </div>
        <img
          className="promo__logo"
          src={LandingLogo}
          alt="Изображение планеты Земля"
        />
      </section>
    </>
  );
}

export default Promo;
