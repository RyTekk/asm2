import { useEffect, useState } from "react";
import useFetch from "../../../hook/use-fetch";
import "./MovieList.css";
import MovieDetail from "./MovieDetail";

let imgUrl = "";

function MovieList(props) {
  const [movies, setMovies] = useState([]);
  let movieUrl = "";

  const [{ show, stateId, backdrop }, setShow] = useState({
    show: false,
    stateId: 0,
    backdrop: "",
  });

  switch (props.category) {
    case "Original":
      movieUrl =
        "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";
      break;
    case "Xu hướng":
      movieUrl = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      break;
    case "Xếp hạng cao":
      movieUrl =
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
      break;
    case "Hành động":
      movieUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28";
      break;
    case "Hài":
      movieUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35";
      break;
    case "Kinh dị":
      movieUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27";
      break;
    case "Lãng mạn":
      movieUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749";
      break;
    case "Tài liệu":
      movieUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99";
      break;
    default:
      movieUrl = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
      break;
  }

  async function listFetch() {
    const configuration = await useFetch(
      "https://api.themoviedb.org/3/configuration"
    );

    if (!configuration.ok) {
      throw new Error("Something went wrong!");
    }
    const configData = await configuration.json();
    imgUrl =
      configData.images.secure_base_url + configData.images.poster_sizes[1];

    const response = await useFetch(movieUrl);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log(data.results);
    setMovies(data.results);
  }

  useEffect(() => {
    listFetch();
  }, []);

  function showDetail(id, path) {
    if (show) {
      if (stateId === id) {
        setShow((prevState) => {
          return { ...prevState, show: false };
        });
      } else {
        setShow((prevState) => {
          return { ...prevState, stateId: id, backdrop: path };
        });
      }
    } else {
      setShow({ show: true, stateId: id, backdrop: path });
    }
  }

  return (
    <div className="movie-list">
      <p className="movie-list-category">{props.category}</p>
      <div className="movie-items-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => {
              showDetail(movie.id, movie.backdrop_path);
            }}
          >
            <img
              src={
                imgUrl +
                (props.category === "Original"
                  ? movie.poster_path
                  : movie.backdrop_path)
              }
            />
          </div>
        ))}
      </div>
      {show && <MovieDetail movie={stateId} backdrop={backdrop} />}
    </div>
  );
}

export default MovieList;
