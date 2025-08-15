import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import Game from './screens/Game';

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-slate-700 to-green-900">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App
