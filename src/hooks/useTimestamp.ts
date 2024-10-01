import { useEffect, useMemo, useState } from "react";

import { useTimestampContext } from "../contexts/TimestampContext";

const useTimestamp = () => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now() / 1000);
  const { midnightTime } = useTimestampContext();

  useEffect(() => {
    const interval = setInterval(() => {
      const cTime = Math.round(Date.now() / 1000);
      setCurrentTime(cTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timePassedFromMidnight = useMemo(() => {
    return Math.floor((currentTime - midnightTime) / 60) * 60;
  }, [currentTime, midnightTime]);

  return { timePassedFromMidnight };
};

export {
  useTimestamp
};