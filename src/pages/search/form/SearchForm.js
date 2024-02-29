import { useState } from "react";
import useFetch from "../../../hook/use-fetch";
import "./SearchForm.css";

function SearchForm(props) {
  const [searchInput, setSearchInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  async function searchHandler(e) {
    e.preventDefault();
    setIsFetching(true);
    props.onLoading(isFetching);
    console.log("FETCHING " + isFetching);
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`;
    const results = await fetchSearch(url);
    props.onSearchResult(results);
  }

  function inputChangeHandler(e) {
    // e.persist();
    // console.log(e);
    setSearchInput(e.target.value);
  }

  function resetHandler(e) {
    e.preventDefault();
    setSearchInput("");
    props.onReset();
  }

  async function fetchSearch(urlSearch) {
    const response = await useFetch(urlSearch);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log(data);

    setIsFetching(false);
    props.onLoading(isFetching);
    console.log("FETCHING " + isFetching);

    return data.results;
  }

  return (
    <form className="search-form">
      <div className="search-input">
        <input value={searchInput} onChange={inputChangeHandler}></input>
      </div>
      <div className="search-btn">
        <button
          className="search-btn-reset"
          onClick={resetHandler}
          type="button"
        >
          RESET
        </button>
        <button className="search-btn-search" onClick={searchHandler}>
          SEARCH
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
