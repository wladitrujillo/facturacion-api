import { Request, Response } from "express";
import { getLogger } from "log4js";
import { PageRequest } from "../model/page-request";
import { IProductCategory } from "../model/product-category";
import ProductCategoryService = require("../service/product.category.service");
import BaseController = require("./base.ctrl");

const logger = getLogger("ProductCategoryController");
class ProductCategoryController extends BaseController<IProductCategory>{
    private productCategoryService: ProductCategoryService;
    constructor() {
        super(new ProductCategoryService());
        this.productCategoryService = new ProductCategoryService();
    }
    retrieveAllProducts = async (req: Request, res: Response) => {
        try {
            let company = res.locals.jwtPayload.company;
            let pageRequest = new PageRequest(req);
            let category = req.params.category;
            let response: any = await this.productCategoryService.retrieveAllProducts(company, category, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (error: any) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
}
export = ProductCategoryController;    