import { ICustomer, Customer } from "../model/customer";
import RepositoryBase from "./base.repository";

class CustomerRepository extends RepositoryBase<ICustomer> {
    constructor() {
        super(Customer);
    }
}

Object.seal(CustomerRepository);
export = CustomerRepository;