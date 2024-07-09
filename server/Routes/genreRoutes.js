import express from "express";
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../Controllers/genre.controller.js";

import {
  authenticate,
  authorizeAdmin,
} from "../MiddleWares/auth.middleware.js";

const router = express.Router();
// admin routes
router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);

//public routes
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;
