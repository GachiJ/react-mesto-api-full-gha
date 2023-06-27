import PopupWithForm from "./PopupWithForm"
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import React from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name='type_edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={"Сохранить"}
    >
      <input type="text" className="popup__input popup__input_type_name"
        name="name"
        id="input-name"
        placeholder="Введите имя"
        required minLength="2" maxLength="40"
        value={name || ""}
        onChange={handleChangeName} />
      <span className="error" id="input-name-error"></span>
      <input type="text"
        className="popup__input popup__input_type_info"
        name="about" id="input-info"
        placeholder="Ваши интересы"
        required minLength="2" maxLength="200"
        value={description || ""}
        onChange={handleChangeDescription} />
      <span className="error" id="input-info-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup