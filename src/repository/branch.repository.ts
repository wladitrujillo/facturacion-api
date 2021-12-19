import { IBranch, Branch } from "../model/branch";
import RepositoryBase from "./base.repository";

class BranchRepository extends RepositoryBase<IBranch> {
    constructor() {
        super(Branch);
    }
}

Object.seal(BranchRepository);
export = BranchRepository;