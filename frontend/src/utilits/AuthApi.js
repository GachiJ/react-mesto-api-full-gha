class AuthApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }


  registerUser({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res))
  }


  loginUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res))
  }

  checkToken() {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => this._checkResponse(res));
  }

  logout() {

    return fetch(`${this._baseUrl}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => this._checkResponse(res))
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://apimestohostback.nomoreparties.sbs',
  credentials: 'include',
});
export default authApi;