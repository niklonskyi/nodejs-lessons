import express, { Request, Response, ErrorRequestHandler } from "express";
import { config } from "./config/config";
import { userRouter } from './routes/user.routes';

export class Server {
  private _app = express();
  private _config = config;

  constructor() {}

  start() {
    this.initMiddlware();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  private initMiddlware() {
    this._app.use(express.json({ limit: "5mb" }));
    this._app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    this._app.use('/users', userRouter);
  }

  private initErrorHandling() {
    const errorHandler: ErrorRequestHandler = (err, req, resp, next) => {
      const statusCode = err.statusCode || 500;
      resp.status(statusCode).send({
        messsage: err.message,
        status: statusCode,
      });
    };
    this._app.use(errorHandler);
  }

  private startListening() {
     this._app.listen(this._config.port, () => {
      console.log('Server stared listening at port ', this._config.port);
     })
  }
}
