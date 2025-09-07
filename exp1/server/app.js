import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from '#app/config/db.js';
import authRoutes from '#app/routes/authRoutes.js';
import portfolioRoutes from '#app/routes/portfolioRoutes.js';

dotenv.config();

// App Initialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Databases Initialization
connectDB();


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
});