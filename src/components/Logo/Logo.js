import { Link } from 'react-router-dom';
import LogoIcon from '../../images/icon/logo-header.svg';
import './Logo.css';

function Logo({ }) {
  return (
    <Link to="/" className="register__container-logo">
      <img
        className="register__logo"
        alt="Логотип в виде белой латинской буквы С на зеленом фоне"
        src={LogoIcon}
      />
    </Link>
  );
}

export default Logo;
