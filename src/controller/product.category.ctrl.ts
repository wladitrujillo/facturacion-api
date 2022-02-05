import { IProductCategory } from "../model/product-category";
import ProductCategoryService = require("../service/product.category.service");
import BaseController = require("./base.ctrl");

class ProductCategoryController extends BaseController<IProductCategory>{
    constructor() {
        super(new ProductCategoryService());

    }
}
export = ProductCategoryController;    