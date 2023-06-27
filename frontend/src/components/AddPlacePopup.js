import PopupWithForm from "./PopupWithForm"
import React from 'react';


function AddPlacePopup({ onAddPlace, isOpen, onClose, }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    })


  }

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm name='type_add-photo'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={"Создать"}
    >
      <input type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="input-name"
        placeholder="Введите имя" required minLength="2" maxLength="40"
        ref={nameRef}
      />
      <span className="error" id="input-name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_info"
        name="link"
        id="input-info"
        placeholder="Ваши интересы" required minLength="2" maxLength="200"
        ref={linkRef}
      />
      <span className="error" id="input-info-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup