class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
      .then(res => this._checkResponse(res));
  }

  setUserInfo({ name, about, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar
      })
    })
      .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include'
    })
      .then(res => this._checkResponse(res))
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => this._checkResponse(res), console.log("fdf"))
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  cardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  deleteCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }
}

const config = {
  baseUrl: 'https://apimestohostback.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
}

const api = new Api(config);
export default api;