import "./Banner.css";

function Banner(props) {
  return (
    <div className="banner">
      <div className="banner-img">
        <img src={props.bannerMovie.img} />
      </div>
      <div className="banner-description">
        <div className="banner-title">{props.bannerMovie.title}</div>
        <div className="banner-button">
          <button>Play</button>
          <button>My List</button>
        </div>
        <p className="overview">{props.bannerMovie.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
