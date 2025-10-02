import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import protect from "./src/middlewares/authMiddleware.js";

// Initial Configuration
dotenv.config();
const app = express();


// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/micro_blogs';

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Instance Connected Successfully");
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

connectDB();


// Middlewares
app.use(cors());
app.use(express.json());

app.use( (req, _, next) => {
    console.log(`Request Received : ${req.method} ${req.url}`);
    next();
})


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', protect, postRoutes);
app.use('/api/users', protect, userRoutes);


// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));