import React from "react";
import { useEffect, useState } from "react";
import { Main } from "../Main/Main";
import {
  Route,
  Routes,
  useNavigate, 
  useLocation
} from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import { Preloader } from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
      const [isFilterSavedMovies, setIsFilterSavedMovies] = useState(false);
      const [moviesCollection, setMoviesCollection] = useState([]);
      const [savedMoviesCollection, setSavedMoviesCollection] = useState([]);
      const [foundMoviesList, setFoundMoviesList] = useState([]);
      const [filterSavedMoviesCollection, setFilterSavedMoviesCollection] = useState([]);
      const [filterTimeMoviesCollection, setFilterTimeMoviesCollection] = useState([]);
      const [filterTimeSavedMoviesCollection, setFilterTimeSavedMoviesCollection] = useState([]);
      const [isLoadingMovies, setIsLoadingMovies] = useState(false);
      const [foundError, setFoundError] = useState(false);
      const [popupImage, setPopupImage] = useState('');
      const [popupText, setPopupText] = useState('');
      const [infoTooltip, setInfoTooltip] = useState(false);

      const history = useNavigate();
      const pathname = useLocation();
      const isLocationMovies = pathname.pathname === "/movies";
      const isLocationSavedMovies = pathname.pathname === "/saved-movies";
      
      function tokenCheck() {
        const jwt = localStorage.getItem("jwt");
        const movies = localStorage.getItem("movies");
        const savedMovies = localStorage.getItem("savedMovies");

        if (jwt) {
          setToken(jwt);
          if (movies) {
            const result = JSON.parse(movies);
            setMoviesCollection(result);
          }
          if (savedMovies) {
            const resultSave = JSON.parse(savedMovies);
            setSavedMoviesCollection(resultSave);
            setFilterSavedMoviesCollection(resultSave);
          }
          MainApi.getContent(jwt)
            .then((user) => {
              setCurrentUser(user);
              setIsLogged(true);
              history(pathname.pathname, { replace: true });
            })
            .catch((err) => {
              setServerError(true);
            });
        }
      }

      useEffect(() => {
        const searchResult = localStorage.getItem("searchResult");
        if (searchResult) {
          setFoundMoviesList(JSON.parse(searchResult));
        }
        const isChecked = localStorage.getItem("isChecked");
        if (isChecked) {
          setIsFilterMovies(JSON.parse(isChecked));
        }
        const shortResult = localStorage.getItem("shortResult");
        if (shortResult) {
          setFilterTimeMoviesCollection(JSON.parse(shortResult));
        }
        const isCheckedSaved = localStorage.getItem("isCheckedSaved");
        if (isCheckedSaved) {
          setIsFilterSavedMovies(JSON.parse(isCheckedSaved));
        }
        const shortResultSaved = localStorage.getItem("shortResultSaved");
        if (shortResultSaved) {
          setFilterTimeSavedMoviesCollection(JSON.parse(shortResultSaved));
        }
      }, [isLogged]);

      useEffect(() => {
        tokenCheck();
      }, []);

      function handleRegister({ email, password, name }) {
        MainApi.register({ email, password, name })
          .then((data) => {
            if (data._id) {
              handleLogin({ email, password });
              setPopupImage(Sucsess);
              // setPopupText("Вы успешно зарегистрировались!");
              // handleInfoTooltip();
              // history('/movies', { replace: true });
            }
          })
          .catch((err) => {
            setPopupImage(Fail);
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
              setPopupText("Вы успешно авторизовались!");
              handleInfoTooltip();
              setIsLogged(true);
              history('/movies', { replace: true });
              MainApi.getSavedMovies(res.token)
                .then((movies) => {
                  setSavedMoviesCollection(movies);
                  setFilterSavedMoviesCollection(movies);
                  localStorage.setItem("savedMovies", JSON.stringify(movies));
                })
                .catch((err) => {
                  console.log(err);
                })
              MainApi.getContent(res.token)
                .then((user) => {
                  setCurrentUser(user);
                })
                .catch((err) => {
                  setServerError(true);
                });
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
        if (isLogged) {
          MainApi.getContent()
            .then((user) => {
              setCurrentUser(user);
            })
            .catch((err) => setProfileError("Не удалось загрузить данные"));
        }
      }
    
      function handleSignOut() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("movies");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("searchResult");
        localStorage.removeItem("isChecked");
        localStorage.removeItem("isCheckedSaved");
        localStorage.removeItem("shortResult");
        localStorage.removeItem("shortResultSaved");
        setIsLogged(false);
        setMoviesCollection([]);
        setSavedMoviesCollection([]);
        setFilterTimeSavedMoviesCollection([]);
        setFilterSavedMoviesCollection([]);
        setFilterTimeMoviesCollection([]);
        setFoundMoviesList([]);
        clearAllErrors();
        history('/', { replace: true });
      }

      function changeFilter() {
        isLocationMovies
          ? setIsFilterMovies(!isFilterMovies)
          : setIsFilterSavedMovies(!isFilterSavedMovies);
      }

      function clearAllErrors() {
        setLoginError("");
        setRegisterError("");
        setFoundError(false);
        setServerError(false);
        setProfileError("");
      }

      function searchMovies(searchText) {
        setServerError(false);
        setIsLoadingMovies(true);
        if (moviesCollection.length > 0) {
          const result = search(moviesCollection, searchText);
          if (result.length > 0) {
            setFoundError(false);
          } else {
            setFoundError(true);
          }
          setFoundMoviesList(result);
          localStorage.setItem("searchResult", JSON.stringify(result));
        } else {
          MoviesApi.getInitialMovies()
            .then((res) => {
              setMoviesCollection(res);
              localStorage.setItem("movies", JSON.stringify(res));
              const result = search(res, searchText);
              if (result.length > 0) {
                setFoundError(false);
              } else {
                setFoundError(true);
              }
              setFoundMoviesList(result);
              if (isFilterMovies) {
                const resultTimeFilter = searchFilterTime(result);
                if (resultTimeFilter.length > 0) {
                  setFoundError(false);
                } else {
                  setFoundError(true);
                }
                setFilterTimeMoviesCollection(resultTimeFilter);
              }
            })
            .catch((err) => setServerError(true));
        }
        setTimeout(() => {
          setIsLoadingMovies(false);
        }, 1000);
      }
    
      function searchSavedMovies(searchText) {
        setServerError(false);
        setIsLoadingMovies(true);
        if (savedMoviesCollection.length > 0) {
          const result = search(savedMoviesCollection, searchText);
          if (result.length > 0) {
            setFoundError(false);
          } else {
            setFoundError(true);
          }
          setFilterSavedMoviesCollection(result);
          setTimeout(() => {
            setIsLoadingMovies(false);
          }, 1000);
        }
      }
    
      function search(collection, searchText) {
        let result = [];
        collection.forEach((movie) => {
          if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            result.push(movie);
          }
        });
        return result;
      }

      function searchFilterTime(collection) {
        let result = [];
        collection.forEach((movie) => {
          if (movie.duration <= 40) {
            result.push(movie);
          }
        });
        return result;
      }

      useEffect(
        () => {
          setFoundError(false);
          localStorage.setItem("isChecked", isFilterMovies);
          if (isLocationMovies) {
            if (isFilterMovies) {
              if (moviesCollection.length > 0) {
                const result = searchFilterTime(foundMoviesList);
                if (result.length > 0) {
                  setFoundError(false);
                } else {
                  setFoundError(true);
                }
                setFilterTimeMoviesCollection(result);
                localStorage.setItem("shortResult", JSON.stringify(result));
              }
            }
          } else {
            localStorage.setItem("isCheckedSaved", isFilterSavedMovies);
            if (isLocationSavedMovies) {
              if (isFilterSavedMovies) {
                if (moviesCollection.length > 0) {
                  const result = searchFilterTime(filterSavedMoviesCollection);
                  if (result.length > 0) {
                    setFoundError(false);
                  } else {
                    setFoundError(true);
                  }
                  setFilterTimeSavedMoviesCollection(result);
                  localStorage.setItem("shortResultSaved", JSON.stringify(result));
                }
              }
            }
          }
        },
        [isFilterMovies, isFilterSavedMovies]
      );
    
      function movieSaveInStore(movie) {
        MainApi.saveMovie({ token, movie })
          .then((res) => {
            const movies = [...savedMoviesCollection, res];
            localStorage.setItem("savedMovies", JSON.stringify(movies));
            setSavedMoviesCollection((prev) => [...prev, res]);
            if (isFilterSavedMovies) {
              setFilterTimeSavedMoviesCollection((prev) => [...prev, res]);
              setFilterSavedMoviesCollection((prev) => [...prev, res]);
            } else {
              setFilterSavedMoviesCollection((prev) => [...prev, res]);
            }
          })
          .catch((err) => setServerError(true));
      }
    
      function movieDeleteFromSavedMovies(id) {
        MainApi.deleteSavedMovie({ token, id })
          .then(() => {
            const result = filterMoviesById(savedMoviesCollection, id);
            setSavedMoviesCollection(result);
            localStorage.setItem("savedMovies", JSON.stringify(result));
            setFilterSavedMoviesCollection(
              filterMoviesById(filterSavedMoviesCollection, id)
            );
            setFilterTimeSavedMoviesCollection(
              filterMoviesById(filterTimeMoviesCollection, id)
            );
          })
          .catch((err) => setServerError(true));
      }
    
      function filterMoviesById(collection, id) {
        return collection.filter((item) => {
          return item._id !== id;
        });
      }

      useEffect(() => {
        clearAllErrors();
        if (pathname === "/saved-movies") {
          setFilterSavedMoviesCollection(savedMoviesCollection);
        }
        if (pathname === "/movies") {
          setFilterSavedMoviesCollection(savedMoviesCollection);
        }
      }, [pathname]);

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
        <Routes>
            <Route exact path="/"
                  element={<Main isLogged={isLogged} />}
            />
            <Route exact path="/movies" 
                  element={<ProtectedRoute isLogged={isLogged}>
                              <Movies 
                                isLogged={isLogged} 
                                isFilterMovies={isFilterMovies}
                                changeFilter={changeFilter}
                                moviesCollection={isFilterMovies ? filterTimeMoviesCollection : foundMoviesList}
                                searchMovies={searchMovies}
                                searchSavedMovies={searchSavedMovies}
                                isLoadingMovies={isLoadingMovies}
                                savedMovies={savedMoviesCollection}
                                movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
                                movieSaveInStore={movieSaveInStore}
                                foundError={foundError}
                                serverError={serverError}
                                clearAllErrors={clearAllErrors}
                            />
                          </ProtectedRoute>}
            />
            <Route exact path="/saved-movies" 
                  element={<ProtectedRoute isLogged={isLogged}>
                              <SavedMovies 
                                isLogged={isLogged} 
                                isFilterSavedMovies={isFilterSavedMovies}
                                changeFilter={changeFilter}
                                moviesCollection={isFilterSavedMovies ? filterTimeSavedMoviesCollection : filterSavedMoviesCollection}
                                searchMovies={searchMovies}
                                searchSavedMovies={searchSavedMovies}
                                isLoadingMovies={isLoadingMovies}
                                savedMovies={savedMoviesCollection}
                                movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
                                movieSaveInStore={movieSaveInStore}
                                foundError={foundError}
                                serverError={serverError}
                                clearAllErrors={clearAllErrors}
                              />
                          </ProtectedRoute>} 
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
    </CurrentUserContext.Provider>
  );
}

export default App;