import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRoutes } from './routes/user.route';
import { ProductRoutes } from './routes/product.route';
import { CustomerRoutes } from './routes/customer.route';
import { AuthRoutes } from './routes/auth.route';
import { checkJwt } from "./controller/check-jwt";
import { configure } from 'log4js';
import path from 'path';
import { config } from "dotenv"
import { EstablishmentRoutes } from './routes/establishment.route';
import { RoleRoutes } from './routes/role.route';
import { MenuRoutes } from './routes/menu.route';
import { TableRoutes } from './routes/table.route';
import { InvoiceRoutes } from './routes/invoice.route';

class App {

  public app: Application;

  constructor() {
    this.app = express();
    //static files
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.setConfig();
    this.setMongoConfig();
    this.routes();
  }

  private routes(): void {
    this.app.use("/api/user", [checkJwt], new UserRoutes().router);
    this.app.use("/api/product", [checkJwt], new ProductRoutes().router);
    this.app.use("/api/customer", [checkJwt], new CustomerRoutes().router);
    this.app.use("/api/establishment", [checkJwt], new EstablishmentRoutes().router);
    this.app.use("/api/invoice", [checkJwt], new InvoiceRoutes().router);
    this.app.use("/api/table", [checkJwt], new TableRoutes().router);
    this.app.use("/api/menu", [checkJwt], new MenuRoutes().router);
    this.app.use("/api/role", [checkJwt], new RoleRoutes().router);
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
    // use JWT auth to secure the api
    //this.app.use('/api', expressJwt({ secret: process.env.SECRET || 'YYEHDf432EY9742', requestProperty: 'auth' })
    //.unless({ path: ['/api/user/authenticate', '/api/user/register', '/api/user/forgot-password', /^\/api\/user\/reset-password\/.*/, '/api/user/password-request'] }));

  }

  //Connecting to our MongoDB database
  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DATABASE || '', {});
  }
}

export default new App().app;