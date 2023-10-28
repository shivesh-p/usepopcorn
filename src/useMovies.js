import { useState, useEffect } from "react";
//close the selected movie on escape key press
//const KEY = "f84fc31d";
const KEY = "e1e74423";
const url = `http://www.omdbapi.com/?apikey=${KEY}&`;

export function useMovies(query, callbackFunction) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState("");

  useEffect(() => {
    callbackFunction?.();
    const controller = new AbortController();

    async function fetchMovies(param) {
      try {
        debugger;
        setIsLoading(true);
        setisError("");
        const result = await fetch(`${url}s=${query}`, {
          signal: controller.signal,
        });
        if (!result.ok) throw new Error("Failed to fetch the movies list 🙅");
        const moviesJson = await result.json();
        if (moviesJson.Response === "False")
          throw new Error("Failed to find the movie you were searching for 🤷‍♂️");
        setMovies(moviesJson.Search);
        setisError("");
      } catch (error) {
        //console.error(error);
        if (error.name !== "AbortError") setisError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setisError("");
      setMovies([]);
      return;
    }
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, isError };
}
