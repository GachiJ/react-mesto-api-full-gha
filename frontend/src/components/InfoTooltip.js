

function InfoTooltip({ name, isOpen, onClose, isSuccess, textIsSuccessTrue, textIsSuccessFalse }) {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__success">
          <button className="popup__button-close" type="button" aria-label="Закрытие попапа"
            id="popup-edit-button-close" onClick={onClose}></button>
          <div
            className={`popup__success ${isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"
              }`}
          ></div>
          <h2 className="popup__success-title">
            {isSuccess
              ? textIsSuccessTrue
              : textIsSuccessFalse}
          </h2>
        </div>
      </div>
    </>
  )
}

export default InfoTooltip