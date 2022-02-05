import { IProductCategory, ProductCategory } from "../model/product-category";
import RepositoryBase from "./base.repository";

class ProductCategoryRepository extends RepositoryBase<IProductCategory> {
    constructor() {
        super(ProductCategory);
    }
}

Object.seal(ProductCategoryRepository);
export = ProductCategoryRepository;