import { useState, useEffect } from "react";
import StarRating from "./stars";
import PropTypes from "prop-types";
import NumberOfResults from "./NumberOfResults";
import Nav from "./Nav";
import Search from "./Search";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import Main from "./Main";
import Box from "./Box";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import MovieList from "./MovieList";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

//const KEY = "f84fc31d";
const KEY = "e1e74423";
const url = `http://www.omdbapi.com/?apikey=${KEY}&`;

export default function App() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [selectedId, setselectedId] = useState(null);

  function handleSelectedMovie(movieId) {
    setselectedId((selectedId) => (selectedId === movieId ? null : movieId));
  }
  function removedSelectedMovie() {
    setselectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((t) => t.imdbId !== id));
  }

  useEffect(() => {
    async function fetchMovies(param) {
      try {
        debugger;
        setIsLoading(true);
        setisError("");
        const result = await fetch(`${url}s=${query}`);
        if (!result.ok) throw new Error("Failed to fetch the movies list 🙅");
        const moviesJson = await result.json();
        if (moviesJson.Response === "False")
          throw new Error("Failed to find the movie you were searching for 🤷‍♂️");
        setMovies(moviesJson.Search);
      } catch (error) {
        setisError(error.message);
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
  }, [query]);

  return (
    <>
      <Nav>
        <Search query={query} onSetQuery={setQuery}></Search>
        <NumberOfResults movies={movies}></NumberOfResults>
      </Nav>
      <Main>
        <Box>
          {/* {isLoading ? (
            <Loader></Loader>
          ) : (
            <MovieList movies={movies}></MovieList>
          )} */}
          {isLoading && <Loader></Loader>}
          {!isLoading && !isError && (
            <MovieList
              movieSelected={handleSelectedMovie}
              movies={movies}
            ></MovieList>
          )}
          {isError && <ErrorMessage error={isError}></ErrorMessage>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              onAddWatched={handleAddWatched}
              key={selectedId}
              removeSelectedMovie={removedSelectedMovie}
              selectedId={selectedId}
              watchedMovies={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>

              <WatchedMovieList
                watched={watched}
                removeWatched={handleDeleteWatched}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
MovieDetails.propTypes = {
  selectedId: PropTypes.string,
  removeSelectedMovie: PropTypes.func,
};
function MovieDetails({
  selectedId,
  removeSelectedMovie,
  onAddWatched,
  watchedMovies,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setuserRating] = useState("");
  const isWatched = watchedMovies
    .map((movie) => movie.imdbId)
    .includes(selectedId);
  //destructuring with alias
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  useEffect(() => {
    async function fetchMoviesDetails() {
      try {
        debugger;
        setIsLoading(true);
        const result = await fetch(`${url}i=${selectedId}`);
        if (!result.ok) throw new Error("Failed to fetch the movies list 🙅");
        const moviesJson = await result.json();
        if (moviesJson.Response === "False")
          throw new Error("Failed to find the movie you were searching for 🤷‍♂️");
        setSelectedMovie(moviesJson);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    if (!selectedId) {
      setSelectedMovie({});
      setIsLoading(false);
    }
    fetchMoviesDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
  }, [title]);

  function handleAdd() {
    const newMovie = {
      imdbId: selectedId,
      imdbRating: +imdbRating,
      title,
      poster,
      year,
      userRating,
      runtime: +runtime.split(" ").at(0),
    };
    onAddWatched(newMovie);
    removeSelectedMovie();
  }
  function handleUserRating(rating) {
    debugger;

    setuserRating(rating);
  }

  const watchedUserRating = watchedMovies.find(
    (item) => item.imdbId === selectedId
  )?.userRating;

  return (
    <div className="details">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={removeSelectedMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={handleUserRating}
                  ></StarRating>
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to Watched List
                    </button>
                  )}
                </>
              )}
              {isWatched && (
                <p>You have rated this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
