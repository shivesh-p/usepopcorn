import { useRef, useEffect } from "react";

export default function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callbackEvent(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        onSetQuery("");
      }
    }
    document.addEventListener("keydown", callbackEvent);
    return () => document.removeEventListener("keydown", callbackEvent);
  }, [onSetQuery]);
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
