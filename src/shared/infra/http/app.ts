import createConnection from "@shared/infra/typeorm";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import SwaggerFile from "../../../swagger.json";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import cors from "cors";
import rateLimiter from "./middlewares/rateLimiter";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

createConnection();
const app = express();

//app.use(rateLimiter);
if (process.env.SENTRY_DSN.length > 50) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);
if (process.env.SENTRY_DSN.length > 50) {
  console.log("Sentry is running!");
  app.use(Sentry.Handlers.errorHandler());
}

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);
export { app };
