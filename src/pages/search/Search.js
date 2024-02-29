import React, { useState } from "react";
import NavBar from "../../navbar/NavBar";
import SearchForm from "./form/SearchForm";
import SearchResult from "./result/SearchResult";

const Search = () => {
  const [listFilm, setListFilm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function searchResult(result) {
    setListFilm(result);
  }

  function resetResult() {
    setListFilm([]);
  }

  function Loading(fetching) {
    setIsLoading(fetching);
    console.log("LOADING " + isLoading);
  }

  return (
    <div className="app">
      <NavBar />
      <SearchForm
        onSearchResult={searchResult}
        onReset={resetResult}
        onLoading={Loading}
      />
      <SearchResult movies={listFilm} load={isLoading} />
    </div>
  );
};

export default Search;
