import { Application, Request, Response } from "express";
import { statusCode } from "./utils/statusCode";
import router from "./router/todoRouter";

export const mainApp = (app: Application) => {
  app.use("/api/v3", router);

  app.get("/", (req: Request, res: Response) => {
    res.status(statusCode.OK).json({
      message: "Welcome to my API",
    });
  });
};
