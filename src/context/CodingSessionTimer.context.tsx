'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export const CodingSessionTimerContext = createContext<{
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}>({
  timer: 0,
  setTimer: () => {},
});

export const CodingSessionTimerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  function pauseTimer() {
    setIsPaused(true);
  }

  function stopTimer() {
    setIsPaused(false);
  }

  const value = {
    timer,
    setTimer,
    pauseTimer,
    stopTimer,
  }

  return (
    <CodingSessionTimerContext.Provider value={value}>
      {children}
    </CodingSessionTimerContext.Provider>
  );
};

export const useCodingSessionTimer = () =>
  useContext(CodingSessionTimerContext);
