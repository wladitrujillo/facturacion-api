import UserRepository from "./../repository/user.repository";
import { IUser } from "../model/user";
import CrudService from "./crud.service";
import bcrypt from "bcryptjs";
import { PageRequest } from "../model/page-request";
import { EmailService } from './mail.service';
import { getLogger } from 'log4js';

const logger = getLogger("UserService");
class UserService extends CrudService<IUser> {

    constructor() {
        super(new UserRepository());
    }


    async retrieve(criteria: any, pageRequest: PageRequest): Promise<IUser[]> {
        criteria.role = { $nin: ['SUPERADMIN'] };
        return this._repository.retrieve(criteria, pageRequest);
    }

    async create(item: IUser): Promise<IUser> {
        logger.debug("Start Create user");

        let gmailService = new EmailService();
        let password = "test123";
        await gmailService.sendMail(
            item.email,
            'Hello',
            'Hello from gmailService your password is: ' + password);
        item.hash = bcrypt.hashSync(password, 10);
        item.active = true;
        return this._repository.create(item);
    }

    getUserById(_id: string) {
        return this._repository.getUserById(_id);
    }

}


Object.seal(UserService);
export = UserService;