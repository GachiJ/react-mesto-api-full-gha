import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import ImagePopup from './ImagePopup.js';
import api from '../utilits/Api';
import authApi from '../utilits/AuthApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("")
  const navigate = useNavigate();




  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCards(cardsData)
          setCurrentUser(userData)
        })
        .catch((err) => console.log(err))
    }

  }, [isLoggedIn])




  function handleLoginUser({ email, password }) {
    authApi.loginUser({ email, password })
      .then((data) => {

        setIsLoggedIn(true);
        setHeaderEmail(email)
        localStorage.setItem("token", data.token);
        navigate('/');

      })
      .catch((err) => {
        setIsSuccess(false); // fail
        setIsInfoTooltipPopupOpen(true)
        console.log(err);
      })
  }


  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      authApi.checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setHeaderEmail(user.data.email)
          navigate('/')
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate('/sign-in')
  }

  function handleRegisterUser({ email, password }) {
    authApi.registerUser({ email, password })
      .then(() => {
        setIsSuccess(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsSuccess(false); // fail
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCard(cardInfo)
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);



    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((newCard) => newCard.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err))
  }


  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen)
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header headerEmail={headerEmail}
            isOpen={isMenuOpen}
            onMenuOpen={handleMenuOpen}
            onSignOut={handleSignOut}
          />
          <Routes>

            <Route path="/" element={<ProtectedRoute component={Main} onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              isLoggedIn={isLoggedIn}
            />} />
            <Route path="/sign-up" element={<Register onRegisterUser={handleRegisterUser} />} />
            <Route path="/sign-in" element={<Login onLoginUser={handleLoginUser} />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
            <Route path="*" element={!isLoggedIn ? <Navigate to="/sign-up" /> : <Navigate to="/sign-in" />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} />

          <PopupWithForm name='confirm_delete' title='Вы уверены?' onClose={closeAllPopups}></PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />

          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess}
            textIsSuccessTrue={"Вы успешно зарегистрировались!"}
            textIsSuccessFalse={"Что-то пошло не так! Попробуйте ещё раз."}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
