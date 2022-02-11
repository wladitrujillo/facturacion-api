import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import { getLogger } from 'log4js';

import { IUser } from "../model/user";
import { ICompany } from "../model/company";
import UserRepository = require("../repository/user.repository");
import CompanyRepository = require("../repository/company.repository");
import { EmailService } from "./mail.service";
import ServiceException = require("./service.exception");
import { Types } from 'mongoose';
import { Email } from '../model/email';

const logger = getLogger("AuthService");

class AuthService {

    private _userRepository: UserRepository;
    private _companyRepository: CompanyRepository;
    private emailService: EmailService;

    constructor() {
        this._userRepository = new UserRepository();
        this._companyRepository = new CompanyRepository();
        this.emailService = new EmailService();
    }

    async register(company: ICompany, user: IUser, password: string) {
        //Metodo que registra el usuario nuevo
        logger.debug('Start register', company, user);
        //Crea la empresa
        let companyCreated = await this._companyRepository.create(company);
        //resetea la id de la empresa
        user.company = companyCreated._id;
        //encripta la contraseña
        user.hash = bcrypt.hashSync(password, 10);
        //usuario desactivado
        user.active = false;
        // asigna rol SUPERADMIN
        user.role = 'SUPERADMIN';
        //Crea el usuario
        let userCreated: IUser = await this._userRepository.create(user);
        //Asigna cuenta de email 
        let email: Email = {
            to: user.email,
            subject: 'Cuenta Creada Exitosamente',
            template: 'newaccount',
            context: { link: `${process.env.WEB_URL}/#/auth/activate-account/${userCreated._id}` }
        }
        //envia el correo
        this.emailService.sendMail(email);
    }

    async authenticate(email: string, password: string) {
        //envia a la base a buscar el email
        let user: IUser = await this._userRepository.findOne({ role: 'SUPERADMIN', email });
        //si no existe el usuario 
        if (!user)
            throw new ServiceException(403, "No existe este usuario como dueño de una empresa");
        //si el usuario no esta activo
        if (!user.active)
            throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo o comunicate con el administrador para activar tu cuenta");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Email o Password Incorrecto");

        let token = this.createToken(user);
        //genera el token
        return token;
    }

    async authenticateWithCompany(ruc: string, email: string, password: string) {
        let company: ICompany = await this._companyRepository.findOne({ ruc });
        //envia a la base a buscar el email
        let user: IUser = await this._userRepository.findOne({ company: company._id, email });
        //si no existe el usuario 
        if (!user)
            throw new ServiceException(403, "Usuario no existe");
        //si el usuario no esta activo
        if (!user.active)
            throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo para activar tu cuenta");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Email o Password Incorrecto");

        let token = this.createToken(user);
        //genera el token
        return token;
    }
    //Olvido contraseña usuario propietario de empresa
    async forgotPassword(email: string) {
        let user: IUser = await this._userRepository.findOne({ role: 'SUPERADMIN', email });
        if (!user)
            throw new ServiceException(403, 'No existe una cuenta raiz con este usuario');

        if (!user.active)
            throw new ServiceException(403, 'Tu cuenta no esta activa revisa tu correo o comunicate con el administrador para activar tu cuenta');

        let token = this.forgotPasswordToken(user);
        let emailDto: Email = {
            to: email,
            subject: 'Cambia tu contraseña',
            template: 'changepassword',
            context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
        }
        this.emailService.sendMail(emailDto);
    }
    //Olvido contraseña para usuario de la empresa
    async forgotPasswordWithCompany(ruc: string, email: string) {
        let company: ICompany = await this._companyRepository.findOne({ ruc });
        let user: IUser = await this._userRepository.findOne({ company: company._id, email });
        if (!user)
            throw new ServiceException(403, 'Usuario no existe')

        let token = this.forgotPasswordToken(user);
        let emailDto: Email = {
            to: email,
            subject: 'Cambia tu contraseña',
            template: 'forgotpassword',
            context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
        }
        this.emailService.sendMail(emailDto);
    }
    //Cambio contraseña
    async resetPassword(token: string, password: string) {
        let jwtPayload = <any>jwt.verify(token, process.env.SECRET || '');
        let user = await this._userRepository.findById(jwtPayload.sub);
        user.hash = bcrypt.hashSync(password, 10);
        await this._userRepository.update(user._id, user);
    }
    //Activa cuenta usuario
    async activateAccount(userId: string) {
        logger.debug('Start activateAccount', userId)
        await this._userRepository.update(this.toObjectId(userId), { active: true });
    }
    //Crea el token válido por un día en el cual consta el rol y id del usuario
    private createToken(user: IUser) {
        //genera una variable pero es constante la misma que no cambia su valor
        const expiresIn = 60 * 60 * 24; //60 seg x 60 min x 24 hours=1 día
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id,
            role: user.role
        }
        //permite declarar una variable que puede cambiar su valor
        let token = {
            result: user,
            //firma el token
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
        return token;
    }
    //Asigna token para cambio de contraseña
    private forgotPasswordToken(user: IUser) {
        const expiresIn = 60 * 5; //60 seg x 5 min 
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id
        }
        return jwt.sign(dataStoredInToken, secret, { expiresIn });
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }


}
Object.seal(AuthService);
export = AuthService;
