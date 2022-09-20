import React, { Suspense, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BsMusicPlayer } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemsCart from "./pages/ItemsCart";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import ErrorPage from "./pages/ErrorPage";
import SingleItem from "./pages/SingleItem";

const App = () => {
  const [audio] = useState(
    new Audio(
      // "https://www.w3schools.com/tags/horse.ogg"
      "https://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
    )
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  const audioControl = () => {
    setPlaying(!playing);
    const musicdiv = document.getElementsByClassName("music-div")[0];
    const customStyles = {
      border: "white",
      backgroundColor: "red",
    };
    Object.keys(customStyles).forEach((key) => {
      musicdiv.style[key] = customStyles[key];
    });

    const musicIcon = document.getElementsByClassName("music-icon")[0];
    const musicStyle = {
      animation: "rotate 1s infinite linear",
      color: "white",
    };
    Object.keys(musicStyle).forEach((keys) => {
      musicIcon.style[keys] = musicStyle[keys];
    });
    if (musicIcon.style.animationPlayState === "running" && playing) {
      musicIcon.style.animationPlayState = "paused";
    } else {
      musicIcon.style.animationPlayState = "running";
    }

    audio.onended = () => {
      setPlaying(false);
      Object.keys(customStyles).forEach((key) => {
        musicdiv.style[key] = "";
      });
      Object.keys(musicStyle).forEach((keys) => {
        musicIcon.style[keys] = "";
      });
      musicIcon.style.animationPlayState = "paused";
    };
  };

  return (
    <Suspense fallback={"Loading"}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/itemscart" element={<ItemsCart />} />
            <Route exact path="/:id" element={<SingleItem />} />
            <Route exact path="/favourite" element={<Favourite />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <div className={"music-div"} onClick={audioControl}>
            <BsMusicPlayer className={"music-icon"} />
          </div>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
};

export default App;
