import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRoutes from "./Routes/userRoutes.js";
import genreRoutes from "./Routes/genreRoutes.js";
import moviesRoutes from "./Routes/moviesRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

const app = express();
app.use(
  cors({
    origin: "https://movie-review-client.onrender.com", // The origin you want to allow
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

// test

app.get("/test", (req, res) => {
  res.send("Hello from server!");
});

// Serve static files from the React app

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

export { app };
