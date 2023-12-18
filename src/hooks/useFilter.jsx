import { useEffect, useReducer } from 'react';
import { SEARCH_KEY, REGEXP_FILTER } from '../utils/config.global';

const initialState = {
  filteredMovies: [],
  savedQuery: { string: '', isShort: false, movies: [] },
  searchStatus: { message: '', isLoading: false, isError: false },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SAVED_QUERY':
      return {
        ...state,
        savedQuery: {
          string: action.payload.string,
          isShort: action.payload.isShort,
          movies: action.payload.movies,
        },
        filteredMovies: action.payload.movies,
      };

    case 'SET_FILTERED_MOVIES':
      return {
        ...state,
        filteredMovies: action.payload,
      };

    case 'SET_LOADER':
      return {
        ...state,
        searchStatus: { ...state.searchStatus, isLoading: action.payload },
      };

    case 'RESET_STATUS':
      return {
        ...state,
        searchStatus: { isLoading: false, isError: false, message: '' },
      };

    case 'SET_ERROR_STATUS':
      return {
        ...state,
        searchStatus: { ...state.searchStatus, isError: true, message: action.payload },
      };

    default:
      return state;
  }
};

export const useFilter = ({ movies, isSavedMoviesPage }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadSavedQuery = () => {
      if (SEARCH_KEY in localStorage && !isSavedMoviesPage) {
        const searchHistory = JSON.parse(localStorage.getItem(SEARCH_KEY));
        dispatch({ type: 'LOAD_SAVED_QUERY', payload: searchHistory });
      }

      if (!localStorage.getItem(SEARCH_KEY) && !isSavedMoviesPage) {
        dispatch({
          type: 'SET_ERROR_STATUS',
          payload: 'Найдите фильм себе по душе',
        });
      }
    };

    loadSavedQuery();
  }, [isSavedMoviesPage]);

  useEffect(() => {
    if (isSavedMoviesPage) dispatch({ type: 'SET_FILTERED_MOVIES', payload: movies });
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if (!isSavedMoviesPage && SEARCH_KEY in localStorage) {
      dispatch({ type: 'SET_FILTERED_MOVIES', payload: state.savedQuery.movies });
    }
  }, [isSavedMoviesPage, state.savedQuery.movies]);

  const filterMovies = (query) => {
    const normalizedQuery = query.string
      .trim()
      .toLowerCase()
      .replace(REGEXP_FILTER, '');

    if (query.isShort) {
      return movies
        .filter(movie => movie.duration <= 40)
        .filter(movie =>
          movie.nameRU.trim().toLowerCase().replace(REGEXP_FILTER, '').includes(normalizedQuery)
        );
    } else {
      return movies
        .filter(movie =>
          movie.nameRU.trim().toLowerCase().replace(REGEXP_FILTER, '').includes(normalizedQuery)
        );
    }
  };

  const handleSubmit = (query) => {
    dispatch({ type: 'RESET_STATUS' });

    const filteredMovies = filterMovies(query);

    dispatch({ type: 'SET_LOADER', payload: true });

    setTimeout(() => {
      if (filteredMovies.length === 0) {
        dispatch({
          type: 'SET_ERROR_STATUS',
          payload: 'Ничего не найдено',
        });
      }
      dispatch({ type: 'SET_FILTERED_MOVIES', payload: filteredMovies });
      dispatch({ type: 'SET_LOADER', payload: false });
    }, 300);

    if (!isSavedMoviesPage) {
      localStorage.setItem(
        SEARCH_KEY,
        JSON.stringify({
          string: query.string,
          isShort: query.isShort,
          movies: filteredMovies,
        })
      );
    }
  };

  return { ...state, handleSubmit };
};
