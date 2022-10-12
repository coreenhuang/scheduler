import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  // transition going forward
  const transition = (newView, replace = false) => {

    // if there is an error, replace last index
    if (replace) {
      return setHistory((prev) => {
        const copy = [
          ...prev.slice(0, prev.length - 1),
          newView
        ];

        return copy;
      });
    }

    // add new mode to history
    setHistory((prev) => {
      const copy = [...prev, newView];
      return copy;
    });
  };

  // going back to previous mode
  const back = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const copy = prev.slice(0, prev.length - 1);
        return copy;
      }

      return prev;
    });
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
};