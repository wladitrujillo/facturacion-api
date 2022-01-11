import { Types } from 'mongoose';

import { ICompany } from '../model/company';

import CatalogRepository from '../repository/catalog.repository';
import MenuRepository from '../repository/menu.repository';
import RoleRepository from '../repository/role.repository';
import CompanyRepository from '../repository/company.repository';
import UserRepository from '../repository/user.repository';
import { EmailService } from './mail.service';
import { IUser } from '../model/user';

class AdminService {

    private menuRepository: MenuRepository;
    private roleRepository: RoleRepository;
    private catalogRepository: CatalogRepository;
    private companyRepository: CompanyRepository;
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor() {
        this.menuRepository = new MenuRepository();
        this.roleRepository = new RoleRepository();
        this.catalogRepository = new CatalogRepository();
        this.companyRepository = new CompanyRepository();
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }

    retrieveByParent = async (parentId: String, roleId: string) => {
        let menus =
            await this.menuRepository.retrieve({ parent: parentId === '' ? undefined : parentId, roles: { $in: roleId } });
        menus.forEach(m => m.roles = []);
        return menus;
    }

    retrieveMenu = async (role: string) => {

        let menus = await this.retrieveByParent('', role);

        for (let menu of menus) {
            menu.children = await this.retrieveByParent(menu._id, role);
        }

        return menus;

    }
    retrieveRoles = () => {
        return this.roleRepository.retrieve({ _id: { $nin: ['SUPERADMIN'] } });
    }

    getCatalogByName = (name: string) => {
        return this.catalogRepository.findOne({ name });
    }

    getCompanyById = (_id: string) => {
        return this.companyRepository.findById(this.toObjectId(_id));
    }

    updateCompany = (_id: string, company: ICompany) => {
        return this.companyRepository.update(this.toObjectId(_id), company);
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}

Object.seal(AdminService);
export = AdminService;