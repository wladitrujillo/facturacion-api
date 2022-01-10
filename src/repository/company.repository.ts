
import { ICompany, Company } from "../model/company";
import RepositoryBase from "./base.repository";

class CompanyRepository extends RepositoryBase<ICompany> {
    constructor() {
        super(Company);
    }
}

Object.seal(CompanyRepository);
export = CompanyRepository;