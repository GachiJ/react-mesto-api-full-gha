import Card from './Card.js';
import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);






  return (
    <>
      <main className="content">
        <section className="profile" aria-label="Профиль">
          <div className="profile__avatar" onClick={onEditAvatar} aria-label="Открыть попап редактирования аватара" name='avatar' style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать профиль"></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить карточку"></button>
        </section>
        <section className="cards" aria-label="Карточки">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main