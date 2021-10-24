import { IUser } from "../model/user";
import UserRepository = require("../repository/user.repository");
import RoleRepository = require("../repository/role.repository");
import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import ServiceException = require("./service.exception");


class AuthService {

    private _userRepository: UserRepository;
    private _roleRepository: RoleRepository;

    constructor() {

        this._userRepository = new UserRepository();
        this._roleRepository = new RoleRepository();

    }

    async register(user: IUser, password: string) {

        let role = await this._roleRepository.findById('SUPERADMIN');

        if (!role)
            throw new ServiceException(404, "Role SUPERADMIN not found");


        user.role = role;
        user.hash = bcrypt.hashSync(password, 10);

        user.active = true;

        return this._userRepository.create(user);
    }

    async authenticate(email: string, password: string) {

        let user: IUser = await this._userRepository.getByEmail(email);

        if (!user)
            throw new ServiceException(404, "Usuario no econtrado");

        if (!user.active)
            throw new ServiceException(403, "Usuario no esta activo");

        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Password invalido");

        let token = this.createToken(user);

        return token;
    }

    private createToken(user: IUser) {
        const expiresIn = 60 * 60 * 24; // 24 hours
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