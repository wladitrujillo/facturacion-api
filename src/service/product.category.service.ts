import ProductCategoryRepository from "./../repository/product.category.repository";
import ProductRepository from "../repository/product.repository";
import { IProductCategory } from "../model/product-category";
import CrudService from "./crud.service";
import { PageRequest } from "../model/page-request";


class ProductCategoryService extends CrudService<IProductCategory> {
    private productRepository: ProductRepository;
    constructor() {
        super(new ProductCategoryRepository())
        this.productRepository = new ProductRepository();
    }

    retrieveAllProducts(company: string, category: string, pageRequest: PageRequest): Promise<any> {
        return this.productRepository.retrieve({ company, category }, pageRequest)
    }
}

Object.seal(ProductCategoryService);
export = ProductCategoryService;