import React from "react";
import { useEffect, useState } from "react";
import { Main } from "../Main/Main";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { ApiProvider } from "../ApiProvider/ApiProvider";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Movies } from '../Movies/Movies';
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";
import * as Api from "../../services/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup";
import Sucsess from "../../images/sucsess.svg"
import Fail from "../../images/fail.svg"

function App() {
      const [currentUser, setCurrentUser] = useState(null);
      const [token, setToken] = useState("");
      const [loginError, setLoginError] = useState("");
      const [registerError, setRegisterError] = useState("");
      const [serverError, setServerError] = useState(false);
      const [profileError, setProfileError] = useState("");
      
      const [foundError, setFoundError] = useState(false);
      const [popupImage, setPopupImage] = useState('');
      const [popupText, setPopupText] = useState('');
      const [infoTooltip, setInfoTooltip] = useState(false);
      
      const history = useNavigate();
      
      function tokenCheck(token) {
        Api.getProfile(token)
          .then((user) => {
            setCurrentUser(user);
            history('/movies', { replace: true })
          })
          .catch((err) => {
            setServerError(true);
            setLoginError("Попробуйте еще раз!");
            if (err === 401) {
              setCurrentUser(null);
              localStorage.removeItem("jwt");
              return history('/signin', { replace: true });
            }
          });
      }

      useEffect(() => {
        if (token) {
          tokenCheck(token);
        }
      }, [token]);

      useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
          setToken(jwt);
        }
      }, []);

      function handleRegister({ email, password, name }) {
        Api.register({ email, password, name })
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
        Api.authorize({ email, password })
          .then((res) => {
            if (res.token) {
              localStorage.setItem("jwt", res.token);
              setToken(res.token);
            }
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
    
      function handleSignOut() {
        localStorage.clear();
        setCurrentUser(null);
        setToken('');
        clearAllErrors();
        history('/', { replace: true });
      }

      function clearAllErrors() {
        setLoginError("");
        setRegisterError("");
        setFoundError(false);
        setServerError(false);
        setProfileError("");
      }

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
        Api.editProfile(token, { name, email })
          .then((newUser) => {
            if (newUser._id) {
              setPopupImage(Sucsess);
              setPopupText("Данные успешно изменены!")
              setCurrentUser(newUser);
              setProfileError("Данные профиля успешно изменены");
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider value={token}>
      <ApiProvider>
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
                                onSignOut={handleSignOut}
                                changeProfile={handlechangeProfile}
                                profileError={profileError}
                                setProfileError={setProfileError}
                              />
                          </ProtectedRoute>}
            />
            { currentUser === null && (
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
              { currentUser === null && (
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
        </ApiProvider>
        </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;