import { ICity, City } from "../model/city";
import RepositoryBase from "./base.repository";

class CityRepository extends RepositoryBase<ICity> {
    constructor() {
        super(City);
    }
}

Object.seal(CityRepository);
export = CityRepository;