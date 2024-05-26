import { Router } from "express";
import { DictionaryController } from "../controller/DictionaryController";
import { EnsureAuthenticated } from "../shared/middleware";

const dictionaryRouter = Router();
const dictionaryController = new DictionaryController();

dictionaryRouter.get("/entries/en", EnsureAuthenticated, (req, res) =>
  dictionaryController.getDefinition(req, res)
);

export default dictionaryRouter;
