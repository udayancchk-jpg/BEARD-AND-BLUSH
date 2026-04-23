import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ConsultantPage from '@/pages/ConsultantPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consultant" element={<ConsultantPage />} />
      </Routes>
    </Router>
  );
}
