import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

//
import usersRoutes from "./Routes/user.routes.js";
import genreRoutes from "./Routes/genre.routes.js";
import movieRoutes from "./Routes/movie.routes.js";
import uploadRoutes from "./Routes/upload.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// console.log("hello world!");
app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

//
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

export { app };
