import React from 'react';
import './InfoStatus.css';

function InfoStatus({ isOpen, onClose, text }) {
  const handlePopupClick = () => {
    onClose();
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
      onClick={handlePopupClick}
    >
      <div
        className="popup__container popup__container_type_tooltip"
        onClick={handleContainerClick}
      >
        <button className="popup__close" onClick={onClose} />
        <h2 className="popup__title popup__title_type_tooltip">
          {text}
        </h2>
      </div>
    </div>
  );
}

export default InfoStatus;
