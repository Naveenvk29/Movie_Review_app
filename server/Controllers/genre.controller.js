import { Genre } from "../Models/Genre.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, "Name is required");
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      throw new ApiError(400, "Genre already exists");
    }

    const genre = await new Genre({ name }).save();
    res
      .status(200)
      .json(new ApiResponse(201, genre, "Genre created successfully"));
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new ApiError(400, error.message, "some went wrong");
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      throw new ApiError(400, "Genre not found");
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res
      .status(201)
      .json(new ApiResponse(201, updatedGenre, "Genre updated Successfully"));
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new ApiError(404, "Some thing went wrong");
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Genre.findByIdAndDelete(id);

    if (!deleted) {
      throw new ApiError(404, "Genre not found");
    }

    res
      .status(201)
      .json(new ApiResponse(201, deleted, "Genre deleted successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(401, "something went wrong");
  }
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({});
    res
      .status(201)
      .json(new ApiResponse(201, all, "Genre fetched successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res
      .status(201)
      .json(new ApiResponse(200, genre, "Genre fetched by id successfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
