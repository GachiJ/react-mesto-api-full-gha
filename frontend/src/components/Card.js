import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete, }) {

  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  const isOwn = card.owner._id === currentUser._id;


  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_type_active'}` 
  );; 

  

  return (
      <article className="card" >
       {isOwn && <button type='button' className="card__delete-button card__delete-button_active"  onClick={handleDeleteClick}  />}
        <img className="card__photo" alt={card.name} src={card.link} onClick={handleClick} />
        <div className="card__panel">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" onClick={handleLikeClick}></button>
            <p className="card__like-number">{card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}

export default Card