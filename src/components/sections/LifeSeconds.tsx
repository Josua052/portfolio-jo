"use client";

import { useEffect, useState } from "react";

export function LifeSeconds() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const birthDate = new Date("2001-09-22T21:00:00Z");

    const updateSeconds = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - birthDate.getTime()) / 1000);
      setSeconds(diff);
    };

    updateSeconds();
    const interval = setInterval(updateSeconds, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-primary font-medium tabular-nums">
      {seconds.toLocaleString()}
    </span>
  );
}
