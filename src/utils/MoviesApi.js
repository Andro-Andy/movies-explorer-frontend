import { URL_MOVIES_API } from './config.global';

export const getMovies = () => {
  return fetch(URL_MOVIES_API, {
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
