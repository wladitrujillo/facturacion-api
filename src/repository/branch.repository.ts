import { IBranch, Branch } from "../model/branch";
import { Types } from "mongoose";
import RepositoryBase from "./base.repository";
import { PageRequest } from "../model/page-request";

class BranchRepository extends RepositoryBase<IBranch> {
    constructor() {
        super(Branch);
    }

    //Consulta segun el criterio de busqueda con paginacion segun la busqueda
    retrieve(criteria: any, pageRequest: PageRequest): Promise<IBranch[]> {

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

            Branch.find(criteria).countDocuments((error, count) => {

                if (error)
                    reject(error)
                else {
                    Branch.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
                        .populate('establishment')
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


    findById(_id: Types.ObjectId): Promise<IBranch> {

        return new Promise((resolve, reject) => {
            Branch.findById(_id)
                .populate("establishment")
                .exec((error: any, result: IBranch) => {
                    if (error) reject(error)
                    else resolve(result);
                });
        });
    }

}

Object.seal(BranchRepository);
export = BranchRepository;