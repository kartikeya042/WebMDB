const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
// We are naming the import 'errorHandler' to match the function inside the file
const { errorHandler } = require('./middleware/errorHandler'); 

connectDB();

const app = express();

// SECURITY: Robust CORS configuration
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/movies', movieRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.json({ status: 'active', message: 'Smart Movie API is running' });
});

// Error Middleware (This MUST be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));