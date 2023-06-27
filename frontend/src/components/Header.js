import Logo from '../images/Vector.svg';
import { Link, Route, Routes } from "react-router-dom";
import React from "react";



function Header({ onSignOut, headerEmail, isOpen, onMenuOpen }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<nav className={` ${isOpen ? 'header__nav_mobile_active' : 'header__nav_mobile'}`}>
          <p className="header__email_mobile">{headerEmail}</p>
          <Link to="sign-in" className="header__exit_mobile" onClick={onSignOut}>
            Выйти
          </Link>
        </nav>}
        />
      </Routes>
      <header className="header">


        <img src={Logo} alt="Логотип" className="header__logo" />

        <Routes>
          <Route path="/" element={
            <>
              <button
                className={`${isOpen ? "header__menu-button_type_closed" : "header__menu-button_type_opened"}`}
                type="button"
                onClick={onMenuOpen}
              />

              <nav className="header__nav">
                <p className="header__email">{headerEmail}</p>
                <Link to="sign-in" className="header__exit" onClick={onSignOut}>
                  Выйти
                </Link>
              </nav>
            </>
          } />

          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          } />

          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          } />

          <Route path="/" element={
            <nav className="header__nav">
              <p className="header__email">{headerEmail}</p>
              <Link to="sign-in" className="header__exit" onClick={onSignOut}>
                Выйти
              </Link>
            </nav>
          } />
        </Routes>
      </header>
    </>
  )
}

export default Header