import { IUser } from "../model/user";
import UserRepository = require("../repository/user.repository");
import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import ServiceException = require("./service.exception");

import { getLogger } from 'log4js';
import { EmailService } from "./mail.service";
const logger = getLogger("AuthService");

class AuthService {

    private _userRepository: UserRepository;
    private emailService: EmailService;

    constructor() {
        this._userRepository = new UserRepository();
        this.emailService = new EmailService();
    }
    //Registro del usuario
    async register(user: IUser, password: string) {
        //encripta la contraseña
        user.hash = bcrypt.hashSync(password, 10);
        //activa el usuario
        user.active = false;
        //asigna el rol USER
        user.role = 'USER';
        //pregunta a mongodb a crear el usuario
        let userCreated: any = await this._userRepository.create(user);
        //envia al correo la notificación de la cuenta creada
        this.emailService.sendMail(user.email, 'Cuenta Creada Exitosamente', `<h2>Bienvenido a tu Facturero Ágil</h2><p>Confirma tu correo electrónico en este <a href='http://localhost:4200/#/auth/activate-account/${userCreated._id}'>enlace</a></p>`);
    }
    //Validacion del usuario y contraseña
    async authenticate(email: string, password: string) {
        //envia a la base a buscar el email
        let user: IUser = await this._userRepository.getByEmail(email);
        //si no existe el usuario 
        if (!user)
            throw new ServiceException(403, "Ingreso no permitido");
        //si el usuario no esta activo
        if (!user.active)
            throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo para activar tu cuenta");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Ingreso no permitido");

        let token = this.createToken(user);
        //genera el token
        return token;
    }

    async forgotPassword(email: string) {
        let user: IUser = await this._userRepository.getByEmail(email);
        if (!user || !user.active)
            throw new ServiceException(403, 'No autorizado')

        let token = this.forgotPasswordToken(user);

        this.emailService.sendMail(email, 'Cambia tu contraseña', `Cambia tu contraseña en este <a href='http://localhost:4200/#/auth/reset-password/${token}'>enlace</a>`);
    }

    async resetPassword(token: string, password: string) {
        let jwtPayload = <any>jwt.verify(token, process.env.SECRET || '');
        let user = await this._userRepository.getUserById(jwtPayload.sub);
        user.hash = bcrypt.hashSync(password, 10);
        await this._userRepository.update(user._id, user);
    }

    async activateAccount(userId: string) {
        let user = await this._userRepository.getUserById(userId);
        user.active = true;
        await this._userRepository.update(user._id, user);
    }
    //Crea el token válido por un día en el cual consta el rol y id del usuario
    private createToken(user: IUser) {
        //genera una variable pero es constante la misma que no cambia su valor
        const expiresIn = 60 * 60 * 24; //60 seg x 60 min x 24 hours=1 día
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
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

    private forgotPasswordToken(user: IUser) {
        const expiresIn = 60 * 5; //60 seg x 5 min 
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            sub: user._id,
        }
        return jwt.sign(dataStoredInToken, secret, { expiresIn });
    }
}
Object.seal(AuthService);
export = AuthService;