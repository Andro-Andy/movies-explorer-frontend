import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="section footer">
      <div className="footer__description">
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </div>
      <div className="footer__navigation">
        <p className="footer__year">&copy;&nbsp;2023</p>
        <nav className="footer__naviganion-links">
          <ul className="footer__list-links">
            <li>
              <a className="footer__link" href='https://practicum.yandex.ru/'>
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a className="footer__link" href='https://github.com/Yandex-Practicum'>
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
