import { Router } from "express";
import { DictionaryController } from "../controller/DictionaryController";
import { EnsureAuthenticated } from "../shared/middleware";

const dictionaryRouter = Router();
const dictionaryController = new DictionaryController();

dictionaryRouter.get("/entries/en", EnsureAuthenticated, (req, res) =>
  dictionaryController.getDefinition(req, res)
);
dictionaryRouter.get("/entries/en/:word", EnsureAuthenticated, (req, res) =>
  dictionaryController.getWord(req, res)
);

export default dictionaryRouter;
