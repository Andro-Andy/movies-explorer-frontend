import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs section ">
      <h3 className="section__title">Технологии</h3>
      <div className="techs__description">
        <h4 className="techs__subtitle">7&nbsp;технологий</h4>
        <p className="techs__text">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
          применили в дипломном проекте.
        </p>
      </div>
      <div className="techs__technologies">
        <p className="techs__item">HTML</p>
        <p className="techs__item">CSS</p>
        <p className="techs__item">JS</p>
        <p className="techs__item">React</p>
        <p className="techs__item">Git</p>
        <p className="techs__item">Express.js</p>
        <p className="techs__item">mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;
