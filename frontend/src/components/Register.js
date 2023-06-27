import React, { useState } from "react";
import { Link, Route } from "react-router-dom";


export default function Register({ isLoggedIn, onRegisterUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Route to="/" />;
  }

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegisterUser({email, password})
  }


  return (
    <form className="authen__form" onSubmit={handleSubmit}>
      <h2 className="authen__title">Регистрация</h2>
      <input className="authen__input"
        placeholder="Email" type="email"
        name="email"
        value={email || ''}
        onChange={handleEmailChange}
      />
      <input className="authen__input"
        placeholder="Пароль" type="password"
        name="password"
        value={password || ''}
        onChange={handlePasswordChange}
      />
      <button type="submit" className="authen__button">Зарегистрироваться</button>
      <div className="authen__signin">
        <Link to="/sign-in" className="authen__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  )
}