import CatalogRepository from "./../repository/catalog.repository";
import { ICatalog } from "../model/catalog";
import CrudService from "./crud.service";


class CatalogService extends CrudService<ICatalog>{

    constructor() {
        super(new CatalogRepository());
    }

    getByTableId = (tableId: string) => {
        return this._repository.retrieveWithCriteria({ table: tableId });
    }

}


Object.seal(CatalogService);
export = CatalogService;