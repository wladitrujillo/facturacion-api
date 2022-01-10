import BranchRepository from "./../repository/branch.repository";
import { IBranch } from "../model/branch";
import CrudService from "./crud.service";
import { Types } from "mongoose";


class BranchService extends CrudService<IBranch>{

    constructor() {
        super(new BranchRepository());
    }


    createWithEstablishment = async (establishment: string, branch: IBranch): Promise<IBranch> => {
        branch.establishment = this.toObjectId(establishment);
        return this._repository.create(branch);
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}


Object.seal(BranchService);
export = BranchService;