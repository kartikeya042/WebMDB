import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recommendation from './pages/Recommendation';
import MovieDetails from './pages/MovieDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommendation />} />
        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;