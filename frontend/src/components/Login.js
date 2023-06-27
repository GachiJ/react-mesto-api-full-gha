import React, { useState } from "react";



export default function Login({ onLoginUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onLoginUser({email, password})
  }
  return (
    <form className="authen__form" onSubmit={handleSubmit}>
    <h2 className="authen__title">Вход</h2>
    <input className="authen__input" 
    placeholder="Email" type="email" 
    name="email"
    value={email || ''}
    onChange={handleEmailChange}
    required
    />
    <input 
    className="authen__input" 
    placeholder="Пароль" type="password" 
    name="password" 
    value={password || ''}
    onChange={handlePasswordChange}
    required
    />
    <button type="submit" className="authen__button">Войти</button>
    </form>
  )
}