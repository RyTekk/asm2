async function useFetch(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmNkZTkwZjc3MTkzOTg5ZTA4M2NlOTYyN2U5ZWEyMyIsInN1YiI6IjY1OGEyODdlZTAzOWYxNTY0YWJkZDdmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6eIH7QnVDTb1CVrOXLCaNBjot-GBJyT9FtXm-hIGXFY",
    },
  };

  const response = await fetch(url, options);

  return response;
}

export default useFetch;
