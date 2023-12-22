export const MOVIES_API = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
  return fetch(MOVIES_API, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
    });
};
