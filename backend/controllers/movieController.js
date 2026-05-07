const { fetchMoviesFromOMDb, fetchMovieDetails } = require('../services/omdbService');
const { calculateAdvancedFuzzyScore } = require('../utils/fuzzyLogic');

// Import the save logic from userController
const { saveRecommendation } = require('./userController');

/**
 * @desc    Search movies with basic fuzzy ranking
 * @route   GET /api/movies/search/:query
 */
const searchMovies = async (req, res, next) => {
    try {
        const movies = await fetchMoviesFromOMDb(req.params.query);
        
        const scoredMovies = movies.map(movie => ({
            title: movie.Title,
            year: movie.Year,
            imdbID: movie.imdbID,
            type: movie.Type,
            poster: movie.Poster,
            fuzzyScore: 0.5 // Default for basic search
        }));

        res.json(scoredMovies);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get full details of a specific movie
 * @route   GET /api/movies/details/:id
 */
const getMovieDetails = async (req, res, next) => {
    try {
        const data = await fetchMovieDetails(req.params.id);
        res.json({
            title: data.Title,
            year: data.Year,
            genre: data.Genre,
            imdbRating: data.imdbRating,
            poster: data.Poster,
            runtime: data.Runtime,
            plot: data.Plot
        });
    } catch (error) {
        res.status(404);
        next(error);
    }
};

/**
 * @desc    Get trending movies (Randomized selection)
 * @route   GET /api/movies/trending
 */
const getTrendingMovies = async (req, res, next) => {
    try {
        const trendingTitles = ['Oppenheimer', 'Dune', 'Avengers', 'Avatar', 'Batman'];
        const randomTitle = trendingTitles[Math.floor(Math.random() * trendingTitles.length)];
        const movies = await fetchMoviesFromOMDb(randomTitle);
        res.json(movies.slice(0, 5));
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Advanced Recommendation Engine with Persistence
 * @route   POST /api/movies/recommend
 */
const recommendMovies = async (req, res, next) => {
    try {
        const { genre, mood, timeAvailable, minRating, yearRange, userId } = req.body; 
        
        // 1. Fetch movie pool based on user's genre preference
        let moviePool = await fetchMoviesFromOMDb(genre || "Action");

        // Apply Year Filter before fetching details to save API calls and ensure we get relevant movies
        if (yearRange === 'new') {
            moviePool = moviePool.filter(m => parseInt(m.Year) >= 2015);
        } else if (yearRange === 'classic') {
            moviePool = moviePool.filter(m => parseInt(m.Year) < 2000);
        }

        // 2. Fetch full details (Rating/Runtime) required for the Fuzzy Logic Engine
        const detailedMovies = await Promise.all(
            moviePool.slice(0, 5).map(m => fetchMovieDetails(m.imdbID))
        );

        // 3. Process each movie through the Fuzzy Logic Engine
        const recommendations = detailedMovies.map(movie => {
            const fuzzyData = calculateAdvancedFuzzyScore(movie, { genre, mood, timeAvailable, minRating });
            return {
                title: movie.Title,
                imdbID: movie.imdbID,
                year: movie.Year,
                imdbRating: movie.imdbRating,
                poster: movie.Poster,
                genre: movie.Genre,
                ...fuzzyData // Includes fuzzyScore and recommendationLevel
            };
        });

        // 4. Sort by highest score (Defuzzification)
        recommendations.sort((a, b) => b.fuzzyScore - a.fuzzyScore);

        // 5. PERSISTENCE: Save the history if a userId is provided
        if (userId) {
            await saveRecommendation(userId, { genre, mood, timeAvailable, minRating, yearRange }, recommendations);
        }

        res.json(recommendations);
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    searchMovies, 
    getMovieDetails, 
    getTrendingMovies, 
    recommendMovies 
};