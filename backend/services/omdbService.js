const axios = require('axios');

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const maskKey = (k) => {
    if (!k) return 'UNSET';
    return k.length > 6 ? k.slice(0,4) + '...' + k.slice(-2) : '****';
};

/**
 * Fetch a list of movies by search string
 */
const fetchMoviesFromOMDb = async (query) => {
    console.log('[DEBUG] fetchMoviesFromOMDb called. API_KEY=', maskKey(API_KEY), 'query=', query);
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        if (response.data.Response === "False") return [];
        return response.data.Search;
    } catch (error) {
        if (error.response) {
            console.error("OMDb Search Error:", error.response.status, error.response.data || error.message);
            if (error.response.status === 401) console.error('OMDb API returned 401: check your OMDB_API_KEY in .env');
        } else {
            console.error("OMDb Search Error:", error.message);
        }
        return []; // Fallback to empty array
    }
};

/**
 * Fetch full details for a specific movie by IMDb ID
 */
const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        if (response.data.Response === "False") throw new Error(response.data.Error);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("OMDb Details Error:", error.response.status, error.response.data || error.message);
            if (error.response.status === 401) console.error('OMDb API returned 401: check your OMDB_API_KEY in .env');
        } else {
            console.error("OMDb Details Error:", error.message);
        }
        throw new Error("Could not retrieve movie details.");
    }
};

module.exports = { fetchMoviesFromOMDb, fetchMovieDetails };