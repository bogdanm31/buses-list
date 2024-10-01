import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/main.scss';

import { TimestampContextProvider } from './contexts/TimestampContext';

import MainHeader from './components/ui/mainHeader/MainHeader';
import Buses from './pages/Buses';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <TimestampContextProvider>
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
