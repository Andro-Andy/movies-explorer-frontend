import './AboutMe.css';
import Photo from '../../images/list/vitalij.png';

function AboutMe() {
  return (
    <section className="about-me section">
      <h3 className="section__title">Студент</h3>

      <div className="about-me__info">
        <div className="about-me__profile">
          <p className="about-me__name">Виталий</p>
          <p className="about-me__profession">
            Фронтенд-разработчик, 30&nbsp;лет
          </p>
          <p className="about-me__description">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
            фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a className="about-me__github link" href="https://github.com/Andro-Andy" target='_blank' rel="noreferrer">
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={Photo}
          alt="Фотография из анкеты"
        />
      </div>
    </section>
  );
}

export default AboutMe;
