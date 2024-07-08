import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// console.log("hello world!");
app.get("/test", (req, res) => {
  res.json({ message: "Hello, World!" });
});

export { app };
