import { IEnterprise, Enterprise} from "../model/enterprise";
import RepositoryBase from "./base.repository";

class EnterpriseRepository extends RepositoryBase<IEnterprise> {
    constructor() {
        super(Enterprise);
    }
}

Object.seal(EnterpriseRepository);
export = EnterpriseRepository;