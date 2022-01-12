import UserRepository from "./../repository/user.repository";
import { IUser } from "../model/user";
import CrudService from "./crud.service";
import bcrypt from "bcryptjs";
import { PageRequest } from "../model/page-request";
import { EmailService } from './mail.service';
import { getLogger } from 'log4js';
import { Types } from "mongoose";

const logger = getLogger("UserService");
class UserService extends CrudService<IUser> {


    private emailService: EmailService;

    constructor() {
        super(new UserRepository());
        this.emailService = new EmailService();
    }


    async retrieve(criteria: any, pageRequest: PageRequest): Promise<IUser[]> {
        criteria.role = { $nin: ['SUPERADMIN'] };
        return this._repository.retrieve(criteria, pageRequest);
    }

    async createUser(user: IUser, password: string): Promise<IUser> {
        user.hasToUpdatePassword = true;
        user.hash = bcrypt.hashSync(password, 10);
        let userCreated: IUser = await this._repository.create(user);
        this.emailService.sendMail(userCreated.email, 'Cuenta Creada Exitosamente', `<h2>Bienvenido a tu Facturero Ágil</h2><p>Ingresa en este <a href='http://localhost:4200/#/auth/login'>enlace</a></p>`);
        return userCreated;
    }

    async updatePassword(userId: string, password: string): Promise<void> {
        let hash = bcrypt.hashSync(password, 10);
        await this._repository.update(this.toObjectId(userId), { hash, hasToUpdatePassword: false });
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}


Object.seal(UserService);
export = UserService;
