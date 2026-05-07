import { Link } from 'react-router-dom';

const MovieCard = ({ movie, showBadge }) => {
  // OMDb uses Capitalized keys, our Fuzzy Logic uses lowercase. 
  // This line ensures we get the right data regardless of the source.
  const title = movie.title || movie.Title;
  const poster = movie.poster || movie.Poster;
  const year = movie.year || movie.Year;
  const id = movie.imdbID;

  return (
    <Link to={`/details/${id}`} className="movie-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {showBadge && <div className="badge">{movie.recommendationLevel}</div>}
      
      <img 
        src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
        alt={title} 
      />
      
      <div className="card-info">
        <h4>{title}</h4>
        <p>{year} • {movie.Type || movie.type || 'Movie'}</p>
        {movie.fuzzyScore && (
          <small style={{color: '#e50914'}}>
            Match: {Math.round(movie.fuzzyScore * 100)}%
          </small>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;