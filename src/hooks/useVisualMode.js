import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHist = history.splice(history.length - 1, 1, newMode);
      setHistory([...history])
    } else {
      setHistory(prev => ([...history, newMode]));
    }
    setMode(newMode);
  };

  const back = () => {
    // return if already at inital mode
    if (history.length === 1) {
      return
    }

    history.pop();
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back};
}
