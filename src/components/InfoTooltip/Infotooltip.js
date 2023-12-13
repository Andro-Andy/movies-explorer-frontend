import './InfoTooltip.css';

function InfoTooltip({ isOpen, onClose, text }) {

  return (
    <>
      <div
        className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
        onClick={() => onClose()}
      >
        <div
          className="popup__container popup__container_type_tooltip"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="popup__close" onClick={onClose}/>
          <h2 className="popup__title popup__title_type_tooltip">
            {text}
          </h2>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
