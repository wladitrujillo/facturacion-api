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

    async create(user: IUser): Promise<IUser> {
        let userCreated: IUser = await this._repository.create(user);
        this.emailService.sendMail(userCreated.email, 'Cuenta Creada Exitosamente', `<h2>Bienvenido a tu Facturero Ágil</h2><p>Confirma tu correo electrónico en este <a href='http://localhost:4200/#/auth/activate-account/${userCreated._id}'>enlace</a></p>`);
        return userCreated;
    }

    getUserById(_id: string) {
        return this._repository.findById(this.toObjectId(_id));
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}


Object.seal(UserService);
export = UserService;
