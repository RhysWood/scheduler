import { useState } from "react";


export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace=false) {
    if(replace){
      setHistory((prev) => [...prev.slice(0, -1), mode])
    } else {
      setHistory((prev) => [...prev, mode])
    }
    setMode(mode);
  }

  function back() {
    setMode(history[0])
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length-2])
    }
  }

  return { mode, transition, back };
}