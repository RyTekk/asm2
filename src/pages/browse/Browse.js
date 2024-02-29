import React, { useEffect, useState } from "react";
import NavBar from "../../navbar/NavBar";
import Banner from "./banner/Banner";
import useFetch from "../../hook/use-fetch";
import MovieList from "./movielist/MovieList";

const CATEGORY_FILM = [
  "Original",
  "Xu hướng",
  "Xếp hạng cao",
  "Hành động",
  "Hài",
  "Kinh dị",
  "Lãng mạn",
  "Tài liệu",
];

function Browse() {
  const [bannerMovie, setBannerMovie] = useState({});

  async function fetchMovies() {
    const configuration = await useFetch(
      "https://api.themoviedb.org/3/configuration"
    );

    if (!configuration.ok) {
      throw new Error("Something went wrong!");
    }
    const configData = await configuration.json();
    console.log(configData);
    var imgUrl =
      configData.images.secure_base_url + configData.images.backdrop_sizes[3];

    const response = await useFetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log(data.results);
    const random = Math.floor(Math.random() * data.results.length - 1);
    const movie = {
      img: imgUrl + data.results[random].backdrop_path,
      title: data.results[random].name,
      overview: data.results[random].overview,
    };
    console.log(movie.img);
    setBannerMovie(movie);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <NavBar />
      <Banner bannerMovie={bannerMovie} />
      {CATEGORY_FILM.map((x, index) => (
        <MovieList key={index} category={x} />
      ))}
    </div>
  );
}

export default Browse;
