import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as api from '../../utils/MainApi';
import * as beatApi from '../../utils/MoviesApi';

import Loader from '../Loader/Loader';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ScreenTypeContext } from '../../contexts/ScreenTypeContext';
import LayoutWithHeaderAndFooter from '../Layouts/LayoutWithHeaderAndFooter';
import LayoutWithHeader from '../Layouts/LayoutWithHeader';
import LayoutWithContentOnly from '../Layouts/LayoutWithContentOnly';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import {
  TOKEN_KEY,
  ROUTER,
  SCREEN,
  INITIAL_USER_STATE,
  SUCCESS_MESSAGES,
  INITIAL_REQ_STATUS,
  MOVIES_URL,
} from '../../utils/config.global';
import InfoTooltip from '../InfoTooltip/Infotooltip';

import { MainPage } from '../Main/Main.async';
import { MoviesPage } from '../Movies/Movies.async';
import { SavedMoviesPage } from '../SavedMovies/SavedMovies.async';
import { ProfilePage } from '../Profile/Profile.async';
import { AuthPage } from '../Auth/Auth.async';

function App() {
  const navigate = useNavigate();
  const screenTypeDebouncer = useRef(null);
  const [currentUser, setCurrentUser] = useState(INITIAL_USER_STATE);
  const [screenType, setScreenType] = useState(SCREEN.desktop.type);
  const [requestStatus, setRequestStatus] = useState(INITIAL_REQ_STATUS);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const changeScreenType = () => {
      clearTimeout(screenTypeDebouncer.current);
      screenTypeDebouncer.current = setTimeout(() => {
        if (window.innerWidth > SCREEN.desktop.width) {
          setScreenType(SCREEN.desktop.type);
        } else if (window.innerWidth > SCREEN.tablet.width) {
          setScreenType(SCREEN.tablet.type);
        } else {
          setScreenType(SCREEN.mobile.type);
        }
      }, 500);
    };

    changeScreenType();
    window.addEventListener('resize', changeScreenType);

    return () => window.removeEventListener('resize', changeScreenType);
  }, [screenType]);

  useEffect(() => {
    if (currentUser.isLogged) {
      api.checkCookie()
        .then((res) => {
          setCurrentUser({
            name: res.name,
            email: res.email,
            isLogged: true,
          });
        })
        .catch(() => resetAuthState());

      beatApi.getMovies()
        .then(setMovies)
        .catch(console.error);

      api.getSavedMovies()
        .then(setSavedMovies)
        .catch(console.error);
    }
  }, [currentUser.isLogged]);

  const closePopup = () => {
    setPopupOpen(false);
    setRequestStatus(INITIAL_REQ_STATUS);
  };

  function resetAuthState() {
    setCurrentUser({});
    localStorage.clear();
  }

  const handleReqMessage = (text) => {
    setRequestStatus((status) => ({ ...status, message: text }));
  };

  const handleReqLoading = (boolean) => {
    setRequestStatus((status) => ({ ...status, isLoading: boolean }));
  };

  const handleReqError = (boolean, text) => {
    setRequestStatus((status) => ({ ...status, isError: boolean }));
    handleReqMessage(text);
    setPopupOpen(true);
  };

  const handleLogin = ({ email, password }) => {
    handleReqLoading(true);
    api.login({ email, password })
      .then((res) => {
        const { token } = res;
        localStorage.setItem(TOKEN_KEY, token);
        setCurrentUser((userData) => ({ ...userData, isLogged: true }));
        navigate(ROUTER.movies, { replace: true });
      })
      .catch((err) => handleReqError(true, err))
      .finally(() => handleReqLoading(false));
  };

  const handleRegister = ({ name, email, password }) => {
    handleReqLoading(true);
    api.register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        handleReqMessage(SUCCESS_MESSAGES.register);
        setPopupOpen(true);
      })
      .catch((err) => handleReqError(true, err))
      .finally(() => handleReqLoading(false));
  };

  const handleLogout = () => {
    handleReqLoading(true);
    api.signOut()
      .then(() => {
        resetAuthState();
        navigate(ROUTER.main, { replace: true });
      })
      .catch((err) => handleReqError(true, err))
      .finally(() => handleReqLoading(false));
  };

  const handleProfileUpdate = ({ name, email }) => {
    handleReqLoading(true);
    api.profileUpdate({ name, email })
      .then((res) => {
        handleReqMessage(SUCCESS_MESSAGES.profileUpdate);
        setPopupOpen(true);
        setCurrentUser({
          isLogged: true,
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => handleReqError(true, err))
      .finally(() => handleReqLoading(false));
  };

  const handleSaveMovie = (movie) => {
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

    api.saveMovie({ ...reqData })
      .then((savedMovie) => setSavedMovies((movies) => [...movies, savedMovie]))
      .catch(console.error);
  };

  const handleRemoveMovie = (id) => {
    api.removeMovie(id)
      .then(() => setSavedMovies((movies) => movies.filter(m => m._id !== id)))
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ScreenTypeContext.Provider value={screenType}>
        <InfoTooltip
          onClose={closePopup}
          isOpen={isPopupOpen}
          text={requestStatus.message}
        />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<LayoutWithHeaderAndFooter />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={ROUTER.movies}
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
                  path={ROUTER.saved}
                  element={
                    <SavedMoviesPage
                      movies={savedMovies}
                      onRemove={handleRemoveMovie}
                    />
                  }
                />
              </Route>
              <Route path={ROUTER.main} element={<MainPage />} />
            </Route>
            <Route element={<LayoutWithHeader />}>
              <Route element={<ProtectedRoute />}>
                <Route
                  path={ROUTER.profile}
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
            <Route element={<LayoutWithContentOnly />}>
              <Route
                path={ROUTER.login}
                element={<AuthPage
                  type={'login'}
                  onLogin={handleLogin}
                  reqStatus={requestStatus}
                />}
              />
              <Route
                path={ROUTER.register}
                element={<AuthPage
                  type={'register'}
                  onRegister={handleRegister}
                  reqStatus={requestStatus}
                />}
              />
              <Route path={ROUTER.any} element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ScreenTypeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
