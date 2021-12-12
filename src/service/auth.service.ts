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

    async register(user: IUser, password: string) {
        user.hash = bcrypt.hashSync(password, 10);
        user.active = true;
        user.role = 'USER';
        await this._userRepository.create(user);
        this.emailService.sendMail(user.email, 'Cuenta Creada Exitosamente', 'Tu cuenta fue creada exitosamente');
    }
    //Validacion del usuario y contraseña
    async authenticate(email: string, password: string) {

        let user: IUser = await this._userRepository.getByEmail(email);

        if (!user)
            throw new ServiceException(403, "Ingreso no permitido");

        if (!user.active)
            throw new ServiceException(403, "Ingreso no permitido");

        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Ingreso no permitido");

        let token = this.createToken(user);

        return token;
    }

    private createToken(user: IUser) {
        const expiresIn = 60 * 60 * 24; //60 seg x 60 min x 24 hours
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            sub: user._id,
            role: user.role
        }

        let token = {
            result: user,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
        return token;
    }
}


Object.seal(AuthService);
export = AuthService;