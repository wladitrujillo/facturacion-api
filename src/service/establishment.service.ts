
import CrudService from "./crud.service";
import { IEstablishment } from "../model/establishment";
import EstablishmentRepository from "../repository/establishment.repository";


class EstablishmentService extends CrudService<IEstablishment>{  

    constructor() {
        super(new EstablishmentRepository());
    }  

}


Object.seal(EstablishmentService);
export = EstablishmentService;