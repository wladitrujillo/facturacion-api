import CustomerRepository from "./../repository/customer.repository";
import { ICustomer } from "../model/customer";
import CrudService from "./crud.service";


class CustomerService extends CrudService<ICustomer> {

    constructor() {
        super(new CustomerRepository());
    }

}


Object.seal(CustomerService);
export = CustomerService;