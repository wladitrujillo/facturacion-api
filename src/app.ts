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
import { AdminRoutes } from './routes/admin.route';
import { EstablishmentRoutes } from './routes/establishment.route';
import { ProductRoutes } from './routes/product.route';
import { CustomerRoutes } from './routes/customer.route';
import { InvoiceRoutes } from './routes/invoice.route';
import { ReportRoutes } from './routes/report.route';
import { ProductCategoryRoutes } from './routes/product.category.route';
import { TaxValueRoutes } from './routes/tax.value.route';

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
    this.app.use("/auth", new AuthRoutes().router);
    this.app.use("/api/user", [checkJwt], new UserRoutes().router);
    this.app.use("/api/establishment", [checkJwt], new EstablishmentRoutes().router);
    this.app.use("/api/admin", [checkJwt], new AdminRoutes().router);
    this.app.use("/api/product", [checkJwt], new ProductRoutes().router);
    this.app.use("/api/product-category", [checkJwt], new ProductCategoryRoutes().router);
    this.app.use("/api/tax-value", [checkJwt], new TaxValueRoutes().router);
    this.app.use("/api/customer", [checkJwt], new CustomerRoutes().router);
    this.app.use("/api/invoice", [checkJwt], new InvoiceRoutes().router);
    this.app.use("/api/report", new ReportRoutes().router);

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
