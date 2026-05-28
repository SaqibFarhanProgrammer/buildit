import { useCodingSessionTimer } from '@/context/CodingSessionTimer.context';
import React from 'react';

function Timer() {
  const { timer } = useCodingSessionTimer();
  return <div>Timer: {timer}</div>;
}

export default Timer;
