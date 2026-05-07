import axios from 'axios';

const API_URL = 'http://localhost:5001/api/movies';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const movieService = {
    search: (query) => api.get(`/search/${query}`),
    getDetails: (id) => api.get(`/details/${id}`),
    getTrending: () => api.get('/trending'),
    getRecommend: (prefs) => api.post('/recommend', prefs),
};

export default api;