import express from "express";
import cookieParser from "cookie-parser";

//
import usersRoutes from "./Routes/user.routes.js";
import genreRoutes from "./Routes/genre.routes.js";

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

export { app };
