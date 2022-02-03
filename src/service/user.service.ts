import UserRepository from "./../repository/user.repository";
import CompanyRepository from "../repository/company.repository";
import { IUser } from "../model/user";
import CrudService from "./crud.service";
import bcrypt from "bcryptjs";
import { PageRequest } from "../model/page-request";
import { EmailService } from './mail.service';
import { getLogger } from 'log4js';
import { Types } from "mongoose";
import { Email } from "../model/email";
import { ICompany } from "../model/company";

const logger = getLogger("UserService");
class UserService extends CrudService<IUser> {


    private companyRepository: CompanyRepository;
    private emailService: EmailService;

    constructor() {
        super(new UserRepository());
        this.companyRepository = new CompanyRepository();
        this.emailService = new EmailService();
    }


    async retrieve(criteria: any, pageRequest: PageRequest): Promise<IUser[]> {
        criteria.role = { $nin: ['SUPERADMIN'] };
        return this._repository.retrieve(criteria, pageRequest);
    }

    async createUser(user: IUser, password: string): Promise<IUser> {
        user.hasToUpdatePassword = true;
        user.hash = bcrypt.hashSync(password, 10);
        let company: ICompany = await this.companyRepository.findById(user.company);
        let userCreated: IUser = await this._repository.create(user);
        let email: Email = {
            to: userCreated.email,
            subject: 'Cuenta Creada Exitosamente',
            template: 'newuser',
            context: { link: `${process.env.WEB_URL}/#/auth/login-company?ruc=${company.ruc}`, username: userCreated.email }
        }
        this.emailService.sendMail(email);
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
