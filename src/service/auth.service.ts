import { IEnterprise } from "../model/enterprise";
import { IUser } from "../model/user";
import EnterpriseRepository = require("../repository/enterprise.repository");
import UserRepository = require("../repository/user.repository");
import RoleRepository = require("../repository/role.repository");
import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import ServiceException = require("./service.exception");


class AuthService {

    private _enterpriseRepository: EnterpriseRepository;
    private _userRepository: UserRepository;
    private _roleRepository: RoleRepository;

    constructor() {

        this._enterpriseRepository = new EnterpriseRepository();
        this._userRepository = new UserRepository();
        this._roleRepository = new RoleRepository();

    }

    async register(enterprise: IEnterprise, user: IUser, password: string) {

        let role = await this._roleRepository.findById('SUPERADMIN');

        if (!role)
            throw new ServiceException(404, "Role SUPERADMIN not found");

        let newEnterprise = await this._enterpriseRepository.create(enterprise);

        user.enterprise = newEnterprise;
        user.role = role;
        user.hash = bcrypt.hashSync(password, 10);
        
        user.active = true;

        return this._userRepository.create(user);
    }

    async login(email: string) {

        let users = await this._userRepository.getByEmail(email);

        if (!users || users.length <= 0)
            throw new ServiceException(404, "Email no registrado");

        return users.map(u => u.enterprise);
    }

    async authenticate(email: string, password: string, enterprise: string) {

        let user = await this._userRepository.getUserByEmailAndEnterprise(email, enterprise);

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
            enterprise: user.enterprise._id || user.enterprise,
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