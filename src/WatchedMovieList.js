import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, removeWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          onRemoveWatched={removeWatched}
        ></WatchedMovie>
      ))}
    </ul>
  );
}
