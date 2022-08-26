import { Header } from "../Header/Header";
import { AboutMe } from "../AboutMe/AboutMe";
import { AboutProject } from "../AboutProject/AboutProject";
import { Portfolio } from "../Portfolio/Portfolio";
import { Promo } from "../Promo/Promo";
import { Techs } from "../Techs/Techs";
import { Footer } from "../Footer/Footer";

export const Main = ({
  isLogged,
  isProfile,
  isMain,
  isMovies,
  isSavedMovies,
}) => {
  return (
    <>
      <Header
        isLogged={isLogged}
        isMain={isMain}
        isMovies={isMovies}
        isSavedMovies={isSavedMovies}
        isProfile={isProfile}
      />
      <main>
        <Promo 
          isLogged={isLogged}
          isMain={true}
          isMovies={false}
          isSavedMovies={false}
          isProfile={false}
        />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};
