import  Movie  from "./Movie";

export default function MovieList({ movies, movieSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          onMovieSelected={movieSelected}
          movie={movie}
          key={movie.imdbID}
        ></Movie>
      ))}
    </ul>
  );
}
