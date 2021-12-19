
import { ITable, Table } from "../model/table";
import RepositoryBase from "./base.repository";

class TableRepository extends RepositoryBase<ITable> {
    constructor() {
        super(Table);
    }
}

Object.seal(TableRepository);
export = TableRepository;