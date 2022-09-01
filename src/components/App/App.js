import React from "react";
import { useEffect, useState } from "react";
import { Main } from "../Main/Main";
import {
  Route,
  Routes,
  useNavigate, 
  useLocation
} from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Movies } from '../Movies/Movies';
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { search } from "../../utils/utils";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup";
import Sucsess from "../../images/sucsess.svg"
import Fail from "../../images/fail.svg"

function App() {
      const [currentUser, setCurrentUser] = useState({});
      const [isLogged, setIsLogged] = useState(false);
      const [token, setToken] = useState("");
      const [loginError, setLoginError] = useState("");
      const [registerError, setRegisterError] = useState("");
      const [serverError, setServerError] = useState(false);
      const [profileError, setProfileError] = useState("");
      
      
      const [isFilterMovies, setIsFilterMovies] = useState(false);
      const [moviesCollection, setMoviesCollection] = useState([]);
      const [isLoadingMovies, setIsLoadingMovies] = useState(false);
      const [foundError, setFoundError] = useState(false);
      const [popupImage, setPopupImage] = useState('');
      const [popupText, setPopupText] = useState('');
      const [infoTooltip, setInfoTooltip] = useState(false);
      
      const history = useNavigate();
      const pathname = useLocation();
      const isLocationMovies = pathname.pathname === "/movies";
      
      function tokenCheck() {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
          setToken(jwt);
          MainApi.getContent(jwt)
            .then((user) => {
              setCurrentUser(user);
              setIsLogged(true);
              history(pathname.pathname, { replace: true });
            })
            .catch((err) => {
              setServerError(true);
              setLoginError("Попробуйте еще раз!");
              if (err === 401) return history('/signin', { replace: true });
            });
        }
      }

      useEffect(() => {
        tokenCheck();
      }, []);

      function handleRegister({ email, password, name }) {
        MainApi.register({ email, password, name })
          .then(() => {
              handleLogin({ email, password });
          })
          .then(() => history('/movies', { replace: true }))
          .catch(() => {
            setPopupImage(Fail);
            setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
            setRegisterError("Что-то пошло не так! Попробуйте ещё раз.");
            handleInfoTooltip();
          });
      }
    
      function handleLogin({ email, password }) {
        MainApi.authorize({ email, password })
          .then((res) => {
            if (res.token) {
              setToken(res.token);
              localStorage.setItem("jwt", res.token);
              setPopupImage(Sucsess);
              setPopupText("Успешный вход!");
              handleInfoTooltip();
              setIsLogged(true);
              history('/movies', { replace: true });
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
        localStorage.removeItem("jwt");
        setIsLogged(false);
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

      // function searchMovies(searchText) {
      //   setServerError(false);
      //   setIsLoadingMovies(true);
      //   if (moviesCollection.length > 0) {
      //     const result = search(moviesCollection, searchText);
      //     if (result.length > 0) {
      //       setFoundError(false);
      //     } else {
      //       setFoundError(true);
      //     }
      //     setFoundMoviesList(result);
      //     localStorage.setItem("searchResult", JSON.stringify(result));
      //   } else {
      //     MoviesApi.getInitialMovies()
      //       .then((res) => {
      //         setMoviesCollection(res);
      //         localStorage.setItem("movies", JSON.stringify(res));
      //         const result = search(res, searchText);
      //         if (result.length > 0) {
      //           setFoundError(false);
      //         } else {
      //           setFoundError(true);
      //         }
      //         setFoundMoviesList(result);
      //         // if (isFilterMovies) {
      //         //   const resultTimeFilter = searchFilterTime(result);
      //         //   if (resultTimeFilter.length > 0) {
      //         //     setFoundError(false);
      //         //   } else {
      //         //     setFoundError(true);
      //         //   }
      //         //   setFilterTimeMoviesCollection(resultTimeFilter);
      //         // }
      //       })
      //       .catch((err) => setServerError(true));
      //   }
      //   setTimeout(() => {
      //     setIsLoadingMovies(false);
      //   }, 1000);
      // }
    
      // function searchSavedMovies(searchText) {
      //   setServerError(false);
      //   setIsLoadingMovies(true);
      //   if (savedMoviesCollection.length > 0) {
      //     const result = search(savedMoviesCollection, searchText);
      //     if (result.length > 0) {
      //       setFoundError(false);
      //     } else {
      //       setFoundError(true);
      //     }
      //     setFilterSavedMoviesCollection(result);
      //     setTimeout(() => {
      //       setIsLoadingMovies(false);
      //     }, 1000);
      //   }
      // }

      // useEffect(
      //   () => {
      //     setFoundError(false);
      //     localStorage.setItem("isChecked", isFilterMovies);
      //     if (isLocationMovies) {
      //       if (isFilterMovies) {
      //         if (moviesCollection.length > 0) {
      //           const result = searchFilterTime(foundMoviesList);
      //           if (result.length > 0) {
      //             setFoundError(false);
      //           } else {
      //             setFoundError(true);
      //           }
      //           setFilterTimeMoviesCollection(result);
      //           localStorage.setItem("shortResult", JSON.stringify(result));
      //         }
      //       }
      //     } else {
      //       localStorage.setItem("isCheckedSaved", isFilterSavedMovies);
      //       if (isLocationSavedMovies) {
      //         if (isFilterSavedMovies) {
      //           if (moviesCollection.length > 0) {
      //             const result = searchFilterTime(filterSavedMoviesCollection);
      //             if (result.length > 0) {
      //               setFoundError(false);
      //             } else {
      //               setFoundError(true);
      //             }
      //             setFilterTimeSavedMoviesCollection(result);
      //             localStorage.setItem("shortResultSaved", JSON.stringify(result));
      //           }
      //         }
      //       }
      //     }
      //   },
      //   [isFilterMovies, isFilterSavedMovies]
      // );
    
          
      // function movieDeleteFromSavedMovies(id) {
      //   MainApi.deleteSavedMovie({ token, id })
      //     .then(() => {
      //       const result = filterMoviesById(savedMoviesCollection, id);
      //       setSavedMoviesCollection(result);
      //       localStorage.setItem("savedMovies", JSON.stringify(result));
      //       setFilterSavedMoviesCollection(
      //         filterMoviesById(filterSavedMoviesCollection, id)
      //       );
      //       setFilterTimeSavedMoviesCollection(
      //         filterMoviesById(filterTimeMoviesCollection, id)
      //       );
      //     })
      //     .catch((err) => setServerError(true));
      // }
    
      // function filterMoviesById(collection, id) {
      //   return collection.filter((item) => {
      //     return item._id !== id;
      //   });
      // }

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
        MainApi.editUserProfile({ token, name, email })
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
        <Routes>
            <Route exact path="/"
                  element={<Main isLogged={isLogged} />}
            />
            <Route exact path="/movies" 
                  element={<ProtectedRoute isLogged={isLogged}>
                              <Movies />
                          </ProtectedRoute>}
            />
            <Route exact path="/saved-movies" 
                  element={<ProtectedRoute isLogged={isLogged}>
                              <SavedMovies />
                           </ProtectedRoute>
              } 
            />
            <Route exact path="/profile"  
                  element={<ProtectedRoute isLogged={isLogged}>
                              <Profile 
                                isLogged={isLogged} 
                                onSignOut={handleSignOut}
                                changeProfile={handlechangeProfile}
                                profileError={profileError}
                                setProfileError={setProfileError}
                              />
                          </ProtectedRoute>}
            /> 
            <Route exact path="/signin"
                  element={<ProtectedRoute isLogged={!isLogged}>
                              <Login 
                                onLogin={handleLogin}
                                loginError={loginError}
                                setLoginError={setLoginError}
                                clearErrors={clearAllErrors}
                              />
                          </ProtectedRoute>}     
            />
            <Route path="/signup"
                  element={<ProtectedRoute isLogged={!isLogged}>
                            <Register 
                              onRegister={handleRegister}
                              registerError={registerError}
                              setRegisterError={setRegisterError}
                              clearErrors={clearAllErrors}
                            />
                          </ProtectedRoute>}    
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltipPopup
              isOpen={infoTooltip}
              onClose={closePopup}
              onCloseOnOverlay={handleClickOutside}
              image={popupImage}
              text={popupText}
        />
        </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;