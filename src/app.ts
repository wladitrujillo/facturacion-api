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
  //inicializa los métodos
  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig(); //conecta a la base de datos
    this.routes();
  }

  private routes(): void {
    // Rutas con autenticacion de token
    this.app.use("/api/user", [checkJwt], new UserRoutes().router);
    this.app.use("/auth", new AuthRoutes().router);

  }

  private setConfig() {
    //inicializacion del log
    configure(__dirname + '/config/log4js.json');
    //configura las variabes de entorno con respecto a la base de datos
    config({ path: '.env' });
    //limita las peticiones a 50mb
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    //habilita el cors(puertos)
    this.app.use(cors());
    //Seteo de la cabecera de respuesta
    this.app.use((req, res, next) => {
      //Configura las cabeceras de la app
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      next();
    });
  }

  //Conexión a MongoDB database
  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DATABASE || '', {});
  }
}

export default new App().app;