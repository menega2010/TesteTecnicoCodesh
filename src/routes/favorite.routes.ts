import { Router } from "express";

import { FavoriteController } from "../controller/FavoriteController";
import { EnsureAuthenticated } from "../shared/middleware";

const favoriteRouter = Router();
const favoriteController = new FavoriteController();

favoriteRouter.post(
  "/entries/en/:word/favorite",
  EnsureAuthenticated,
  (req, res) => favoriteController.favoriteWord(req, res)
);
favoriteRouter.delete(
  "/entries/en/:word/unfavorite",
  EnsureAuthenticated,
  (req, res) => favoriteController.unfavoriteWord(req, res)
);

export default favoriteRouter;
