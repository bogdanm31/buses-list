import React, { useEffect, useState } from 'react';
import './styles/main.scss';

import MainHeader from './components/ui/mainHeader/MainHeader';
import Buses from './components/buses/list/Buses';
import useTime from './hooks/use-time';

const App = () => {
  const { timePassedFromMidnight } = useTime();
  const [currentTime, setCurrentTime] = useState(timePassedFromMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      const cTime = timePassedFromMidnight();
      setCurrentTime(cTime);
    }, 20000);

    return () => clearInterval(interval);
  }, [timePassedFromMidnight]);

  return (
    <>
      <MainHeader
        timestamp={currentTime}
      />
      <main>
        <Buses timestamp={currentTime} />
      </main>
    </>
  );
}

export default App;
