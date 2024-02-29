import { useEffect, useState } from "react";
import MovieDetail from "../../browse/movielist/MovieDetail";
import useFetch from "../../../hook/use-fetch";
import "./SearchResult.css";

let imgUrl = "";

function SearchResult(props) {
  const [{ show, stateId, backdrop }, setShow] = useState({
    show: false,
    stateId: 0,
    backdrop: "",
  });

  async function config() {
    const configuration = await useFetch(
      "https://api.themoviedb.org/3/configuration"
    );

    if (!configuration.ok) {
      throw new Error("Something went wrong!");
    }
    const configData = await configuration.json();
    imgUrl =
      configData.images.secure_base_url + configData.images.poster_sizes[1];
  }

  useEffect(() => {
    config();
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
    <div className="search-result">
      <div className="search-result-text">Search Result</div>
      {props.load && <p>Searching...!</p>}
      <div className="search-result-list">
        {props.movies.map((movie) => (
          <div
            key={movie.id}
            className="search-result-item"
            onClick={() => {
              showDetail(movie.id, movie.backdrop_path);
            }}
          >
            <img src={imgUrl + movie.poster_path} />
          </div>
        ))}
      </div>
      {show && <MovieDetail movie={stateId} backdrop={backdrop} />}
    </div>
  );
}

export default SearchResult;
