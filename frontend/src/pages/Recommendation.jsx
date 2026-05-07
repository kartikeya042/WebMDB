import { useState } from 'react';
import { movieService } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { Clock, Star, Calendar, Zap } from 'lucide-react';

const Recommendation = () => {
    const [prefs, setPrefs] = useState({
        genre: 'Action',
        mood: 'casual',
        timeAvailable: 120,
        minRating: 6,
        yearRange: 'all'
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // This calls your backend POST /api/movies/recommend
            const { data } = await movieService.getRecommend(prefs);
            setResults(data);
        } catch (err) {
            console.error("Fetch Error:", err);
            alert("Check if backend is running on Port 5000");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '50px' }}>
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                    ADVANCED <span style={{ color: '#e50914' }}>AI</span> RECOMMENDER
                </h1>
                <p style={{ color: '#94a3b8' }}>Fuzzy Logic Engine v2.0 • Real-time Scoring</p>
            </div>

            <form onSubmit={handleSubmit} style={{
                background: '#1e293b', padding: '40px', borderRadius: '20px',
                display: 'flex', flexDirection: 'column', gap: '30px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                border: '1px solid #334155'
            }}>
                {/* DROP DOWN ROW */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>GENRE</label>
                        <select
                            value={prefs.genre}
                            onChange={(e) => setPrefs({ ...prefs, genre: e.target.value })}
                            style={{ padding: '12px', background: '#0f172a', color: 'white', borderRadius: '8px', width: '180px', border: '1px solid #475569' }}
                        >
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Animation">Animation</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>MOOD</label>
                        <select
                            value={prefs.mood}
                            onChange={(e) => setPrefs({ ...prefs, mood: e.target.value })}
                            style={{ padding: '12px', background: '#0f172a', color: 'white', borderRadius: '8px', width: '180px', border: '1px solid #475569' }}
                        >
                            <option value="casual">Casual / Chill</option>
                            <option value="intense">Intense / Serious</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>RELEASE ERA</label>
                        <select
                            value={prefs.yearRange}
                            onChange={(e) => setPrefs({ ...prefs, yearRange: e.target.value })}
                            style={{ padding: '12px', background: '#0f172a', color: 'white', borderRadius: '8px', width: '180px', border: '1px solid #475569' }}
                        >
                            <option value="all">Any Year</option>
                            <option value="new">Modern (2015+)</option>
                            <option value="classic">Classic (Pre-2000)</option>
                        </select>
                    </div>
                </div>

                {/* SLIDERS ROW */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <Clock size={20} color="#e50914" />
                            Time Available: <span style={{ color: '#fff', fontWeight: 'bold' }}>{prefs.timeAvailable}m</span>
                        </label>
                        <input
                            type="range" min="30" max="240" step="15"
                            value={prefs.timeAvailable}
                            onChange={(e) => setPrefs({ ...prefs, timeAvailable: e.target.value })}
                            style={{ width: '100%', accentColor: '#e50914', cursor: 'pointer' }}
                        />
                    </div>

                    <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <Star size={20} color="#f59e0b" />
                            Min. Rating: <span style={{ color: '#fff', fontWeight: 'bold' }}>{prefs.minRating}+</span>
                        </label>
                        <input
                            type="range" min="1" max="9" step="0.5"
                            value={prefs.minRating}
                            onChange={(e) => setPrefs({ ...prefs, minRating: e.target.value })}
                            style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <button type="submit" style={{
                    padding: '18px 60px', background: '#e50914', color: 'white',
                    border: 'none', borderRadius: '10px', fontWeight: '800',
                    cursor: 'pointer', alignSelf: 'center', fontSize: '1.1rem',
                    textTransform: 'uppercase', letterSpacing: '1px',
                    transition: 'all 0.2s ease'
                }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    SCAN DATABASE
                </button>
            </form>

            <div style={{ marginTop: '4rem' }}>
                {loading ? <Loader /> : (
                    <div className="movie-grid">
                        {results.length > 0 ? (
                            results.map((movie) => (
                                <div key={movie.imdbID} style={{ position: 'relative' }}>
                                    <MovieCard movie={movie} showBadge={true} />
                                    <div style={{
                                        padding: '15px', fontSize: '0.85rem', color: '#cbd5e1',
                                        background: '#1e293b', borderTop: '2px solid #334155',
                                        borderRadius: '0 0 12px 12px', marginTop: '-10px',
                                        display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        <Zap size={14} color="#e50914" fill="#e50914" />
                                        {movie.fuzzyScore > 0.85
                                            ? "Top Tier Match for your schedule!"
                                            : "Balanced match for your preferences."}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px', color: '#475569' }}>
                                <h3>No matches yet. Adjust your sliders and scan!</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendation;