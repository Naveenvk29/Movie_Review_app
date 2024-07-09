import express from "express";
const router = express.Router();
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../Controllers/movie.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../MiddleWares/auth.middleware.js";
import checkId from "../MiddleWares/checkId.js";

// Admin routes

router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

// Public routes

router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

//private routes
router.post("/:id/reviews", authenticate, checkId, movieReview);

export default router;
