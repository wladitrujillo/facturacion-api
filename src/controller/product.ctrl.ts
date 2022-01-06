import { IProduct } from "../model/product";
import ProductService = require("../service/product.service");
import BaseController = require("./base.ctrl");

class ProductController extends BaseController<IProduct>{
    constructor() {
        super(new ProductService());

    }
}
export = ProductController;    