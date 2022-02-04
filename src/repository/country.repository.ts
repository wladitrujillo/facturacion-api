import { ICountry, Country } from "../model/country";
import RepositoryBase from "./base.repository";

class CountryRepository extends RepositoryBase<ICountry> {
    constructor() {
        super(Country);
    }
}

Object.seal(CountryRepository);
export = CountryRepository;