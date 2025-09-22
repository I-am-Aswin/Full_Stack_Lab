import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectMongo from "#app/config/db.js";
import authRouter from "#app/routes/authRoutes.js";
import taskRouter from "#app/routes/taskRoutes.js";


// Loading env secrets
dotenv.config();

// App Initialization
const app = express();

// Middleware Initialization
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

app.use( (req, _, next) => {
    console.log(`Request URL : ${req.url}`);
    next();
});

// DB Connection
connectMongo(process.env.MONGO_URI);

// Routes Declaration
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {

})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Started Listening on Port ${PORT}`);
})