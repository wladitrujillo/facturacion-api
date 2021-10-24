import TableRepository from "./../repository/table.repository";
import { ITable } from "../model/table";
import CrudService from "./crud.service";


class TableService extends CrudService<ITable>{

    constructor() {
        super(new TableRepository());
    }

}


Object.seal(TableService);
export = TableService;