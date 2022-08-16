import React from "react";
import { Main } from "../Main/Main";
import {
  Route,
  Routes,
} from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer"
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <main>
            <Routes>
            <Route exact path="/" 
                  element={<Main />} 
            />
            <Route exact path="/movies" 
                  element={<Movies />} 
            />
            <Route exact path="/saved-movies" 
                  element={<SavedMovies />} 
            />
            <Route exact path="/profile"  
                  element={<Profile />}
            />
            <Route exact path="/signin"
                  element={<Login />}
            />
            <Route exact path="/signup"
                  element={<Register />}
            />
            <Route path="*" element={<NotFound />} />
            </Routes>
      </main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;