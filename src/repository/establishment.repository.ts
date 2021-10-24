
import RepositoryBase from "./base.repository";
import { IEstablishment, Establishment } from "../model/establishment";

class EstablishmentRepository extends RepositoryBase<IEstablishment> {
    constructor() {
        super(Establishment);
    }
}

Object.seal(EstablishmentRepository);
export = EstablishmentRepository;