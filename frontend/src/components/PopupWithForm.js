function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, textButton}) {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__button-close" type="button" aria-label="Закрытие попапа"
            id="popup-edit-button-close" onClick={onClose}></button>
          <form className="popup__form" name="profile-form" id={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            {children}
          </form>
          <button className="popup__button-submit" type="submit">{textButton}</button>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm