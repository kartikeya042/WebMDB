import { useState, useEffect } from 'react';
import { movieService } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Wait 600ms after typing stops before searching
    const debouncedSearch = useDebounce(searchTerm, 600);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = debouncedSearch
                    ? await movieService.search(debouncedSearch)
                    : await movieService.getTrending();
                setMovies(data);
            } catch (err) {
                setError("Failed to fetch movies. Ensure backend is on port 5000.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [debouncedSearch]);

    return (
        <div className="container">
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <input
                    type="text"
                    placeholder="Search movies (e.g. Inception)..."
                    style={{
                        width: '100%', maxWidth: '600px', padding: '15px',
                        borderRadius: '30px', border: 'none', background: '#1e293b',
                        color: 'white', outline: 'none', fontSize: '1.1rem'
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && <p style={{ color: '#e50914', textAlign: 'center' }}>{error}</p>}

            <h2 style={{ marginBottom: '1.5rem', color: '#94a3b8' }}>
                {searchTerm ? `Showing results for "${searchTerm}"` : 'Trending Picks'}
            </h2>

            {loading ? <Loader /> : (
                <div className="movie-grid">
                    {movies.map((m) => <MovieCard key={m.imdbID} movie={m} />)}
                </div>
            )}
        </div>
    );
};

export default Home;