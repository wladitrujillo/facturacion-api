import ProductCategoryRepository from "./../repository/product.category.repository";
import { IProductCategory } from "../model/product-category";
import CrudService from "./crud.service";


class ProductCategoryService extends CrudService<IProductCategory> {
    constructor() {
        super(new ProductCategoryRepository())
    }
}

Object.seal(ProductCategoryService);
export = ProductCategoryService;