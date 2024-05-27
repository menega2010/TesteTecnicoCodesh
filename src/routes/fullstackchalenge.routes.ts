import { Request, Response, Router } from "express";

const rootRouter = Router();

rootRouter.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Fullstack Challenge 🏅 - Dictionary" });
});

export default rootRouter;
