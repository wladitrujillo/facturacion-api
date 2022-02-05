import { ITaxValue } from "../model/tax-value";
import TaxValueService = require("../service/tax.value.service");
import BaseController = require("./base.ctrl");

class TaxValueController extends BaseController<ITaxValue>{
    constructor() {
        super(new TaxValueService());

    }
}
export = TaxValueController;    