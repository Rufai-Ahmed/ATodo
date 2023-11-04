import cors from "cors";
import express, { Application } from "express";
import { mainConnection } from "./utils/dbConfig";
import { mainApp } from "./mainApp";

const app: Application = express();

const port: number = 4000;

app.use(cors());
app.use(express.json());

mainApp(app);

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
