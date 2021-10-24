import mongoose = require("mongoose");
import { PageRequest } from "../model/page-request";


class CrudService<T extends mongoose.Document> {

    public _repository: any;

    constructor(repository: any) {
        this._repository = repository;
    }

    create(item: T): Promise<T> {
        return this._repository.create(item);
    }

    retrieve(criteria: any, pageRequest: PageRequest): Promise<T[]> {
        return this._repository.retrieve(criteria, pageRequest);
    }

    retrieveAll(): T[] {
        return this._repository.retrieveAll();
    }

    async update(_id: string, item: T) {

        let obj: T = await this._repository.findById(_id);

        return this._repository.update(obj._id, item);
    }

    delete(_id: string) {
        return this._repository.delete(_id);
    }

    findById(_id: string) {
        return this._repository.findById(_id);
    }

    findOne(criteria: any) {
        return this._repository.findOne(criteria);
    }



}


Object.seal(CrudService);
export = CrudService;