import { useRef, useEffect } from "react";
import { useKeyPress } from "./useKeyPress";

export default function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);
  useKeyPress("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    onSetQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}
