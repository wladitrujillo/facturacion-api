import { IProduct, Product } from "../model/product";
import RepositoryBase from "./base.repository";

class ProductRepository extends RepositoryBase<IProduct> {
    constructor() {
        super(Product);
    }
}

Object.seal(ProductRepository);
export = ProductRepository;