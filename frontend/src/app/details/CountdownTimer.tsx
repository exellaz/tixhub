// CountdownTimer.tsx
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  eventDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(eventDate).getTime();
      const currentTime = new Date().getTime();
      const difference = eventDateTime - currentTime;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Event has started');
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return <div>{timeLeft}</div>;
};

export default CountdownTimer;
