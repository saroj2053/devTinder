import express, { Request, Response } from 'express';
import chalk from 'chalk';
import connectDB from "./config/database";

const app = express();

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


const PORT = process.env.SERVER_PORT || 3000;

connectDB().then(() => {
    console.log(chalk.italic.cyan("Database connected successfully..."));
    app.listen(PORT, () => {
        console.log(chalk.italic.blue(`Server is running on http://localhost:${PORT}`));
    });
}).catch((error) => {
    console.error(chalk.italic.red("Database connection failed:"), error);
});