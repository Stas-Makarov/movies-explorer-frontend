import React from "react";
import { useEffect, useState } from "react";
import { Main } from "../Main/Main";
import {
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  MOVIES_ROUTE,
  PRIVATE_ROUTES
} from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useApi } from '../../hooks/useApi';
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Movies } from '../Movies/Movies';
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import * as Api from "../../services/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup";
import Sucsess from "../../images/sucsess.svg"
import Fail from "../../images/fail.svg"

function App() {
  const { user, setUser, signOut } = useUser();
  const api = useApi();
  const [isLogged, setLogged] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [profileError, setProfileError] = useState("");
  
  const [foundError, setFoundError] = useState(false);
  const [popupImage, setPopupImage] = useState('');
  const [popupText, setPopupText] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);
  
  const history = useNavigate();
  const location = useLocation();

  function getProfile() {
    api.getProfile()
      .then((user) => {
        setUser(user);
      });
  }


  useEffect(() => {
    Api.getProfile().then((user) => {
      setUser(user);
    });
  }, []);

  function handleRegister({ email, password, name }) {
    api.register({ email, password, name })
      .then(() => {
          handleLogin({ email, password });
      })
      .catch(() => {
        setPopupImage(Fail);
        setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
        setRegisterError("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function handleLogin({ email, password }) {
    api.authorize({ email, password })
      .then(() => {
        getProfile();
      })
      .then(() => {
        setPopupImage(Sucsess);
        setPopupText("Успешный вход!");
        handleInfoTooltip();
        setLogged(true);
      })
      .catch((err) => {
        setPopupImage(Fail);
        setPopupText('Не верные имя пользователя или пароль.');
        handleInfoTooltip();
        if (err === 400) return setLoginError("Не передано одно из полей");
        if (err === 401) return setLoginError("Пользователь с email не найден");
        setLoginError("Попробуйте еще раз!");
        console.log(err);
      });
  }

  function clearAllErrors() {
    setLoginError("");
    setRegisterError("");
    setFoundError(false);
    setServerError(false);
    setProfileError("");
  }

  useEffect(() => {
    if (isLogged) {
      history(MOVIES_ROUTE, { replace: true });
      setLogged(false);
    }
  }, [history, isLogged]);

  useEffect(() => {
    if (InfoTooltipPopup) {
      const closeByEscape = (e) => {
        if (e.key === 'Escape') {
          closePopup();
        }
      }
      document.addEventListener('keydown', closeByEscape);
      return () => document.removeEventListener('keydown', closeByEscape)
    }
  }, [InfoTooltipPopup]);


  function handlechangeProfile({ name, email }) {
    api.editProfile({ name, email })
      .then((newUser) => {
        if (newUser._id) {
          setPopupImage(Sucsess);
          setPopupText("Данные успешно изменены!")
          setUser(newUser);
          setProfileError("Данные профиля успешно изменены");
          handleInfoTooltip();
        } else if (newUser.message) {
          setProfileError(newUser.message);
        }
      })
      .catch((err) =>
        setProfileError("Произошла ошибка при обновлении профиля")
      );
  }
  
  const closePopup = () => {
    setInfoTooltip(false);
  }

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('popup_is-opened')) {
      closePopup();
    }
  }

  const handleInfoTooltip = () => {
    setInfoTooltip(true);
  }

  if (PRIVATE_ROUTES.includes(location.pathname) && !user) {
    return null;
  }

  return (
    <>
      <Routes>
          <Route exact path="/"
                element={<Main />}
          />
          <Route exact path="/movies" 
                element={<ProtectedRoute>
                            <Movies />
                        </ProtectedRoute>}
          />
          <Route exact path="/saved-movies" 
                element={<ProtectedRoute>
                            <SavedMovies />
                          </ProtectedRoute>
            } 
          />
          <Route exact path="/profile"  
                element={<ProtectedRoute>
                            <Profile 
                              changeProfile={handlechangeProfile}
                              profileError={profileError}
                              setProfileError={setProfileError}
                            />
                        </ProtectedRoute>}
          />
          { user === null && (
              <Route exact path="/signin"
                    element={
                                <Login 
                                  onLogin={handleLogin}
                                  loginError={loginError}
                                  setLoginError={setLoginError}
                                  clearErrors={clearAllErrors}
                                />
                            }     
              />
              )}
          { user === null && (
            <Route path="/signup"
                  element={
                            <Register 
                              onRegister={handleRegister}
                              registerError={registerError}
                              setRegisterError={setRegisterError}
                              clearErrors={clearAllErrors}
                            />
                          }    
            />
            )}
          <Route path="*" element={<NotFound />} />
      </Routes>
      <InfoTooltipPopup
            isOpen={infoTooltip}
            onClose={closePopup}
            onCloseOnOverlay={handleClickOutside}
            image={popupImage}
            text={popupText}
      />
    </>
  );
}

export default App;