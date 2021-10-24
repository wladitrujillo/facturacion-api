import mongoose = require("mongoose");
import { PageRequest } from "../model/page-request";

class RepositoryBase<T extends mongoose.Document>  {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<mongoose.Document> {

        return new Promise((resolve, reject) => {
            this._model.create(item, (error: any, result: mongoose.Document) => {
                if (error) reject(error)
                else resolve(result)
            });
        })

    }

    retrieve(criteria: any, pageRequest: PageRequest) {


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

            this._model.find(criteria).countDocuments((error, count) => {

                if (error)
                    reject(error)
                else {
                    this._model.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
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

    retrieveAll() {

        return new Promise((resolve, reject) => {

            this._model.find({}, (error, result) => {
                if (error) reject(error)
                else resolve(result)
            });

        });

    }

    update(_id: mongoose.Types.ObjectId, item: T): Promise<T> {

        return new Promise((resolve, reject) => {
            this._model.update({ _id: _id }, item, (error: any, result: T) => {
                if (error) reject(error)
                else resolve(result);
            });
        });


    }

    delete(_id: string) {
        return new Promise((resolve, reject) => {
            this._model.remove({ _id }, (error) => {
                if (error) reject(error)
                else resolve(_id);
            });
        });


    }

    findById(_id: string): Promise<T> {

        return new Promise((resolve, reject) => {
            this._model.findById(_id, (error: any, result: T) => {
                if (error) reject(error)
                else resolve(result);
            });
        });
    }

    findOne(searchCriteria: any): Promise<T> {

        return new Promise((resolve, reject) => {
            this._model.findOne(searchCriteria, (error: any, result: T) => {
                if (error) reject(error)
                else resolve(result);
            });
        });
    }


}

export = RepositoryBase;