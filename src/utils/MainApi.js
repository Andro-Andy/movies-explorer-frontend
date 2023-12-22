export const MAIN_API = 'http://api.movie-dox.nomoredomainsmonster.ru';
// export const MAIN_API = 'http://localhost:3001';

const _headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const _request = (url, options) => {
  return fetch(MAIN_API + url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};

export const register = ({ name, email, password }) => {
  return _request('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: _headers,
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = ({ email, password }) => {
  return _request('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: _headers,
    body: JSON.stringify({ email, password }),
  });
};

export const checkCookie = () => {
  return _request('/users/me', {
    credentials: 'include',
    headers: _headers,
  });
};

export const signOut = () => {
  return _request('/signout', {
    method: 'POST',
    credentials: 'include',
    headers: _headers,
  });
};

export const profileUpdate = ({ name, email }) => {
  return _request('/users/me', {
    method: 'PATCH',
    credentials: 'include',
    headers: _headers,
    body: JSON.stringify({ name, email }),
  });
};

export const getSavedMovies = () => {
  return _request('/movies', {
    credentials: 'include',
    headers: _headers,
  });
};

export const saveMovie = ({ ...reqData }) => {
  return _request('/movies', {
    method: 'POST',
    credentials: 'include',
    headers: _headers,
    body: JSON.stringify({ ...reqData }),
  });
};

export const removeMovie = (id) => {
  return _request('/movies/' + id, {
    method: 'DELETE',
    credentials: 'include',
    headers: _headers,
  });
};
