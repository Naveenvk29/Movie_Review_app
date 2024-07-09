import express from "express";

// Controllers
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
} from "../Controllers/Movie.controller.js";
// Middlewares
import {
  authenticate,
  authorizeAdmin,
} from "../MiddleWares/auth.middleware.js";
import { checkId } from "../MiddleWares/checkId.js";

const router = express.Router();

// Admin Routes

router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

// Restricted Routes
router.post("/:id/reviews", authenticate, checkId, movieReview);

// Public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);
export default router;
