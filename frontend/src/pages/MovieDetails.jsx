import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/api'; // Use the new service
import { ArrowLeft, Star, Clock, Calendar } from 'lucide-react';
import Loader from '../components/Loader';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Updated this line to use movieService.getDetails
                const { data } = await movieService.getDetails(id);
                setMovie(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <Loader />;
    if (!movie) return <div className="container">Movie not found.</div>;

    return (
        <div className="container">
            <button
                onClick={() => navigate(-1)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <img
                    src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.title}
                    style={{ borderRadius: '12px', width: '300px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                />

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>{movie.title}</h1>

                    <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', marginBottom: '20px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Star size={18} color="#f59e0b" /> {movie.imdbRating}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={18} /> {movie.runtime}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={18} /> {movie.year}</span>
                    </div>

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#cbd5e1', maxWidth: '800px' }}>{movie.plot}</p>

                    <div style={{ marginTop: '30px' }}>
                        <h4 style={{ color: '#e50914', marginBottom: '10px' }}>Genre</h4>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {movie.genre?.split(',').map(g => (
                                <span key={g} style={{ background: '#1e293b', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem' }}>{g.trim()}</span>
                            )) || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;