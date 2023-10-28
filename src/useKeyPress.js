import { useEffect } from "react";
export function useKeyPress(keycode, functionToBeExecutedOnKeyPress) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === keycode) functionToBeExecutedOnKeyPress?.();
    });
    return function () {
      document.removeEventListener("keydown", (e) => {
        if (e.code === keycode) functionToBeExecutedOnKeyPress?.();
      });
    };
  }, [keycode, functionToBeExecutedOnKeyPress]);
}
