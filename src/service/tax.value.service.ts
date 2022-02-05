import TaxValueRepository from "./../repository/product.category.repository";
import { ITaxValue } from "../model/tax-value";
import CrudService from "./crud.service";


class TaxValueService extends CrudService<ITaxValue> {
    constructor() {
        super(new TaxValueRepository())
    }
}

Object.seal(TaxValueService);
export = TaxValueService;