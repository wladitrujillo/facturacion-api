import ProductRepository from "./../repository/product.repository";
import { IProduct } from "../model/product";
import CrudService from "./crud.service";


class ProductService extends CrudService<IProduct> {


    constructor() {
        super(new ProductRepository())
    }

}


Object.seal(ProductService);
export = ProductService;