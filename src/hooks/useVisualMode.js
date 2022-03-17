import { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      return setMode(mode);
    }
    setMode(mode);
    setHistory(prev => ([...prev, mode]))
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1))
      const copy = [...history]
      copy.pop()
      setMode(copy[copy.length - 1])      
    }
  }

  return { mode, transition, back };
};

export default useVisualMode;