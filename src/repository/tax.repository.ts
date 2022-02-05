import { ITax, Tax } from "../model/tax";
import RepositoryBase from "./base.repository";

class TaxRepository extends RepositoryBase<ITax> {
    constructor() {
        super(Tax);
    }
}

Object.seal(TaxRepository);
export = TaxRepository;