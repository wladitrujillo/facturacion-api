//librerias externas
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

//configuraciones
import { configure } from 'log4js';
import { config } from "dotenv"
import { checkJwt } from "./controller/check-jwt";

//rutas
import { AuthRoutes } from './routes/auth.route';
import { UserRoutes } from './routes/user.route';
class App {

  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.routes();
  }

  private routes(): void {
    // Rutas con autenticacion de token
    this.app.use("/api/user", [checkJwt], new UserRoutes().router);
    this.app.use("/auth", new AuthRoutes().router);

  }

  private setConfig() {
    //initializations
    configure(__dirname + '/config/log4js.json');
    config({ path: '.env' });
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
    //Seteo en middleware cabecera de respuesta
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      next();
    });
  }

  //Connecting to our MongoDB database
  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DATABASE || '', {});
  }
}

export default new App().app;