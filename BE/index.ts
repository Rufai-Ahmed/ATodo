import cors from "cors";
import express, { Application, Request, Response } from "express";
import { mainConnection } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app: Application = express();

const port: number = 4000;

app.use(cors());
app.use(express.json());

mainApp(app);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hi Set08",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./router/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "API is active and ready",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error occurred",
    });
  }
});

const server = app.listen(port, () => {
  console.log("Server is running🏃🏿‍♂️");
  mainConnection();
});

process
  .on("uncaughtException", (error: Error) => {
    console.log(error);
    process.exit(1);
  })
  .on("unhandledRejection", (reason: any) => {
    console.log(reason);
    server.close(() => {
      process.exit(1);
    });
  });
