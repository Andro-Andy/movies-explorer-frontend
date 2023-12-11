import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <>
    <section className="profile">
      <h2 className="profile__welcome">Привет, Виталий!</h2>
      <form className="profile__form">
        <fieldset className="profile__form-fieldset">
          <div className='profile__form-container'>
          <label className="profile__form-label" htmlFor="name">
            Имя
          </label>
          <input
            className="profile__form-input"
            id="name"
            name="name"
            type="text" defaultValue="Виталий"
          />
          </div>
          <div className='profile__form-container'>
          <label className="profile__form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="profile__form-input"
            id="email"
            name="email"
            type="email"
            defaultValue="pochta@yandex.ru"
          />
          </div>
        </fieldset>
          <button className="profile__form-button" type="submit" title='Редактировать'>
            Редактировать
          </button>
      </form>
      <button className="profile__logout-button" title='Выйти из аккаунта'>Выйти из аккаунта</button>
    </section>
      </>
  );
}

export default Profile;
