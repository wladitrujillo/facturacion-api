import BranchRepository from "./../repository/branch.repository";
import { IBranch } from "../model/branch";
import CrudService from "./crud.service";


class BranchService extends CrudService<IBranch>{

    constructor() {
        super(new BranchRepository());
    }

}


Object.seal(BranchService);
export = BranchService;