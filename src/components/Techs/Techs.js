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
        <div className="techs__item">HTML</div>
        <div className="techs__item">CSS</div>
        <div className="techs__item">JS</div>
        <div className="techs__item">React</div>
        <div className="techs__item">Git</div>
        <div className="techs__item">Express.js</div>
        <div className="techs__item">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
