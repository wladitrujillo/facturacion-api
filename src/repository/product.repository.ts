import { Types } from "mongoose";
import { PageRequest } from "../model/page-request";
import { IProduct, Product } from "../model/product";
import RepositoryBase from "./base.repository";

class ProductRepository extends RepositoryBase<IProduct> {
    constructor() {
        super(Product);
    }

    retrieve(criteria: any, pageRequest: PageRequest): Promise<IProduct[]> {

        let plus = /\+/g;
        let comma = /\,/g;

        if (pageRequest.q) {
            criteria.$text = { $search: pageRequest.q }
        }
        if (pageRequest.sort) {
            pageRequest.sort = pageRequest.sort.replace(plus, '');
            pageRequest.sort = pageRequest.sort.replace(comma, ' ');
        }
        if (pageRequest.fields) {
            pageRequest.fields = pageRequest.fields.replace(comma, ' ');
        }

        return new Promise((resolve, reject) => {

            let response: any = {};

            Product.find(criteria).countDocuments((error, count) => {

                if (error)
                    reject(error)
                else {
                    Product.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
                        .populate('taxes')
                        .exec((error, result) => {
                            if (error) reject(error)
                            else {
                                response.total = count;
                                response.data = result;
                                resolve(response)
                            }
                        })
                }

            });
        });
    }

    findById(_id: Types.ObjectId): Promise<IProduct> {

        return new Promise((resolve, reject) => {
            Product.findById(_id)
                .populate("taxes")
                .exec((error: any, result: IProduct) => {
                    if (error) reject(error)
                    else resolve(result);
                });
        });
    }
}

Object.seal(ProductRepository);
export = ProductRepository;