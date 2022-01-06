import { ICatalog, Catalog } from "../model/catalog";
import RepositoryBase from "./base.repository";

class CatalogRepository extends RepositoryBase<ICatalog> {
    constructor() {
        super(Catalog);
    }
    
    retrieveWithCriteria(criteria: any) {

        return Catalog.find(criteria);

    }
}

Object.seal(CatalogRepository);
export = CatalogRepository;
