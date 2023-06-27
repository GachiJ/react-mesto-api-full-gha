function ImagePopup({card, onClose}) {
  return (
    <>
      <div className={`popup popup_type_photo ${card.link ? 'popup_opened' : ''}`}>
        <div className="popup__container-image">
          <button className="popup__button-close" type="button" id="popup-photo-button-close" onClick={onClose}></button>
          <img className="popup__photo" src={card.link} alt={card.name} />
          <h3 className="popup__caption">{card.name}</h3>
        </div>
      </div>
    </>
  )
}

export default ImagePopup