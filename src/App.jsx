import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-4 sm:p-8 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
      </Routes>
    </div>
  );
}

export default App;