import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./Routes/userRoutes.js";
import genreRoutes from "./Routes/genreRoutes.js";
import moviesRoutes from "./Routes/moviesRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

export { app };
