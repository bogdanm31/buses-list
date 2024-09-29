import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/main.scss';

import { TimestampContextProvider } from './contexts/TimestampContext';

import MainHeader from './components/ui/mainHeader/MainHeader';
import Buses from './pages/Buses';

const App = () => {
  const queryClient = new QueryClient();
  const [currentTime, setCurrentTime] = useState<number>(Date.now() / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const cTime = Math.round(Date.now() / 1000);
      setCurrentTime(cTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimestampContextProvider currentTime={currentTime}>
      <MainHeader />
      <main>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Buses />}
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </main>
    </TimestampContextProvider>
  );
}

export default App;
