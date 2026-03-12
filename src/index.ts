import express, { Request, Response } from "express";
import "dotenv/config";
import chalk from "chalk";
import connectDB from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import profileRoutes from "./routes/profile.route";
import requestRoutes from "./routes/request.route";
import userRoutes from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/user", userRoutes);

/*
* @desc    Welcome route
* @route   GET /
* @access  Public 
*/
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to the dev Tinder Server 💗"
    });
});

/*
* @desc Health check route
* @route GET /health
* @access  Public 
*/
app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "Server is running smoothly 🚀" });
});


app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 3000;

connectDB().then(() => {
    console.log(chalk.italic.cyan("Database connected successfully..."));
    app.listen(PORT, () => {
        console.log(chalk.italic.blue(`Server is running on http://localhost:${PORT}`));
    });
}).catch((error) => {
    console.error(chalk.italic.red("Database connection failed:"), error);
});