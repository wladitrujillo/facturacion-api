import { IUser } from "../model/user";
import UserRepository = require("../repository/user.repository");
import RoleRepository = require("../repository/role.repository");
import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import ServiceException = require("./service.exception");

import { getLogger } from 'log4js';
import { EmailService } from "./mail.service";
const logger = getLogger("AuthService");

class AuthService {

    private _userRepository: UserRepository;
    private roleRepository: RoleRepository;
    private emailService: EmailService;

    constructor() {
        this._userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.emailService = new EmailService();
    }
    //Registro del usuario
    async register(user: IUser, password: string) {
        //encripta la contraseña
        user.hash = bcrypt.hashSync(password, 10);
        //activa el usuario
        user.active = true;
        //asigna el rol USER
        user.role = 'USER';
        //pregunta a mongodb a crear el usuario
        await this._userRepository.create(user);
        //envia al correo la notificación de la cuenta creada
        this.emailService.sendMail(user.email, 'Cuenta Creada Exitosamente', `<h2>Bienvenido a tu Facturero Ágil</h2><p>Tu cuenta fue creada exitosamente</p>`);
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
            throw new ServiceException(403, "Ingreso no permitido");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Ingreso no permitido");

        let token = this.createToken(user);
        //genera el token
        return token;
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
}
Object.seal(AuthService);
export = AuthService;