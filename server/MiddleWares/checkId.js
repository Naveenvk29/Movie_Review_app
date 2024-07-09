import { isValidObjectId } from "mongoose";

export const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    throw new Error(`Invalid Object Of: ${req.params.id}`);
  }
  next();
};
