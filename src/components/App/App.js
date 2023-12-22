import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import './App.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ScreenTypeContext } from '../../contexts/ScreenTypeContext';
import {
  SCREEN,
  SUCCESS_MESSAGES,
  INITIAL_REQUEST_STATUS,
} from '../../utils/config.global';

import Loader from '../Loader/Loader';
import InfoStatus from '../InfoStatus/InfoStatus';
import PageNotFound from '../PageNotFound/PageNotFound';

import Layout from '../Layout/Layout';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import MainPage from '../Main/Main';
import MoviesPage from '../Movies/Movies';
import SavedMoviesPage from '../SavedMovies/SavedMovies';
import ProfilePage from '../Profile/Profile';
import AuthPage from '../Auth/Auth';
const TOKEN = 'jwt';
const MOVIES_URL = 'https://api.nomoreparties.co';
const USER_STATE = {
  name: '',
  email: '',
  isLogged: !!localStorage.getItem('jwt'),
};
const App = () => {
  const navigate = useNavigate();
  const screenTypeDebouncer = useRef(null);
  const [currentUser, setCurrentUser] = useState(USER_STATE);
  const [screenType, setScreenType] = useState(SCREEN.desktop.type);
  const [requestStatus, setRequestStatus] = useState(INITIAL_REQUEST_STATUS);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const changeScreenType = () => {
      clearTimeout(screenTypeDebouncer.current);
      screenTypeDebouncer.current = setTimeout(() => {
        const newScreenType =
          window.innerWidth > SCREEN.desktop.width
            ? SCREEN.desktop.type
            : window.innerWidth > SCREEN.tablet.width
              ? SCREEN.tablet.type
              : SCREEN.mobile.type;

        setScreenType(newScreenType);
      }, 500);
    };

    changeScreenType();
    window.addEventListener('resize', changeScreenType);

    return () => window.removeEventListener('resize', changeScreenType);
  }, [screenType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser.isLogged) {
          const cookieCheckResult = await MainApi.checkCookie();
          setCurrentUser({
            name: cookieCheckResult.name,
            email: cookieCheckResult.email,
            isLogged: true,
          });

          const moviesData = await MoviesApi.getMovies();
          setMovies(moviesData);

          const savedMoviesData = await MainApi.getSavedMovies();
          setSavedMovies(savedMoviesData);
        }
      } catch (error) {
        resetAuthState();
      }
    };

    fetchData();
  }, [currentUser.isLogged]);

  const closePopup = () => {
    setPopupOpen(false);
    setRequestStatus(INITIAL_REQUEST_STATUS);
  };

  const resetAuthState = () => {
    setCurrentUser({});
    localStorage.clear();
  };

  const handleReqMessage = (text) => {
    setRequestStatus((status) => ({ ...status, message: text }));
  };

  const handleReqLoading = (isLoading) => {
    setRequestStatus((status) => ({ ...status, isLoading }));
  };

  const handleReqError = (isError, text) => {
    setRequestStatus((status) => ({ ...status, isError }));
    handleReqMessage(text);
    setPopupOpen(true);
  };

  const handleLogin = async ({ email, password }) => {
    handleReqLoading(true);
    try {
      const { token } = await MainApi.login({ email, password });
      localStorage.setItem(TOKEN, token);
      setCurrentUser((userData) => ({ ...userData, isLogged: true }));
      navigate('/movies', { replace: true });
    } catch (error) {
      handleReqError(true, error);
    } finally {
      handleReqLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    handleReqLoading(true);
    try {
      await MainApi.register({ name, email, password });
      handleLogin({ email, password });
      handleReqMessage(SUCCESS_MESSAGES.register);
      setPopupOpen(true);
    } catch (error) {
      handleReqError(true, error);
    } finally {
      handleReqLoading(false);
    }
  };

  const handleLogout = async () => {
    handleReqLoading(true);
    try {
      await MainApi.signOut();
      resetAuthState();
      navigate('/', { replace: true });
    } catch (error) {
      handleReqError(true, error);
    } finally {
      handleReqLoading(false);
    }
  };

  const handleProfileUpdate = async ({ name, email }) => {
    handleReqLoading(true);
    try {
      const res = await MainApi.profileUpdate({ name, email });
      handleReqMessage(SUCCESS_MESSAGES.profileUpdate);
      setPopupOpen(true);
      setCurrentUser({
        isLogged: true,
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      handleReqError(true, error);
    } finally {
      handleReqLoading(false);
    }
  };

  const handleSaveMovie = async (movie) => {
    const reqData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIES_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    try {
      const savedMovie = await MainApi.saveMovie({ ...reqData });
      setSavedMovies((prevMovies) => [...prevMovies, savedMovie]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMovie = async (id) => {
    try {
      await MainApi.removeMovie(id);
      setSavedMovies((prevMovies) => prevMovies.filter((m) => m._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ScreenTypeContext.Provider value={screenType}>
        <InfoStatus
          onClose={closePopup}
          isOpen={isPopupOpen}
          text={requestStatus.message}
        />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout hasHeader={true} hasFooter={true} />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={'/movies'}
                  element={
                    <MoviesPage
                      movies={movies}
                      savedMovies={savedMovies}
                      onSave={handleSaveMovie}
                      onRemove={handleRemoveMovie}
                    />
                  }
                />
                <Route
                  path={'/saved-movies'}
                  element={
                    <SavedMoviesPage
                      movies={savedMovies}
                      onRemove={handleRemoveMovie}
                    />
                  }
                />
              </Route>
              <Route path={'/'} element={<MainPage />} />
            </Route>
            <Route element={<Layout hasHeader={true} hasFooter={false} />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={'/profile'}
                  element={
                    <ProfilePage
                      onProfileUpdate={handleProfileUpdate}
                      onLogout={handleLogout}
                      reqStatus={requestStatus}
                    />
                  }
                />
              </Route>
            </Route>
            <Route element={<Layout hasHeader={false} hasFooter={false} />}>
              <Route
                path={'/signin'}
                element={
                  <AuthPage
                    type={'login'}
                    onLogin={handleLogin}
                    reqStatus={requestStatus}
                  />
                }
              />
              <Route
                path={'/signup'}
                element={
                  <AuthPage
                    type={'register'}
                    onRegister={handleRegister}
                    reqStatus={requestStatus}
                  />
                }
              />
              <Route path={'*'} element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ScreenTypeContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
