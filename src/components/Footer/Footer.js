import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

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
              <Link
                to='https://practicum.yandex.ru'
                className="footer__link"
              >
                Яндекс.Практикум
              </Link>

            </li>
            <li>
              <Link
                to='https://github.com/Yandex-Practicum'
                className="footer__link"
                target='_blank'
              >
                Github
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
