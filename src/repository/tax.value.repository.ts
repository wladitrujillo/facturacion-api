import { ITaxValue, TaxValue } from "../model/tax-value";
import RepositoryBase from "./base.repository";

class TaxValueRepository extends RepositoryBase<ITaxValue> {
    constructor() {
        super(TaxValue);
    }
}

Object.seal(TaxValueRepository);
export = TaxValueRepository;