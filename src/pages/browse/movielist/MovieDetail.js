import { useEffect, useState } from "react";
import useFetch from "../../../hook/use-fetch";
import "./MovieDetail.css";

let imgUrl = "";

function MovieDetail(props) {
  const [ok, setOk] = useState(true);
  const [movie_detail, setDetail] = useState({});
  const [video, setVideo] = useState([]);
  const [filteredVideo, setFilteredVideo] = useState("");

  async function config() {
    const configuration = await useFetch(
      "https://api.themoviedb.org/3/configuration"
    );

    if (!configuration.ok) {
      throw new Error("Something went wrong!");
    }
    const configData = await configuration.json();
    imgUrl =
      configData.images.secure_base_url + configData.images.backdrop_sizes[3];
  }

  useEffect(() => {
    config();
  }, []);

  async function fetchDetail(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
    const response = await useFetch(url);

    if (!response.ok) {
      setOk(false);
      return;
    }

    const data = await response.json();
    console.log(data);
    setDetail(data);
    setOk(true);
  }

  async function fetchVideo(movie_id) {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;
    const response = await useFetch(url);

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    console.log(data);
    setVideo(data.results);
  }

  useEffect(() => {
    fetchDetail(props.movie);
    fetchVideo(props.movie);
  }, [props.movie]);

  function findVideo() {
    if (video.length > 0) {
      const foundVideo = video.find(
        (video) =>
          video.site == "YouTube" &&
          (video.type == "Trailer" || video.type == "Teaser")
      );

      setFilteredVideo(foundVideo.key);
      console.log(filteredVideo);
    } else {
      setFilteredVideo("");
    }
  }

  useEffect(() => {
    findVideo();
  }, [video]);

  return (
    <div className="movie-detail">
      {ok ? (
        <>
          <div className="movie-text">
            <div className="movie-title">{movie_detail.title}</div>
            <div className="movie-info">
              <p>
                Release date: {movie_detail.release_date}
                <br />
                Vote: {movie_detail.vote_average}/10
              </p>
            </div>
            <div className="movie-description">{movie_detail.overview}</div>
          </div>
          <div className="movie-video">
            {filteredVideo ? (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${filteredVideo}`}
              ></iframe>
            ) : (
              <div>
                <img src={imgUrl + props.backdrop} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div>The resource you requested could not be found.</div>
      )}
    </div>
  );
}

export default MovieDetail;
