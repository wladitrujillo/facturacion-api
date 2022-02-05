import { Types } from 'mongoose';
import { ICompany } from '../model/company';
import CatalogRepository from '../repository/catalog.repository';
import MenuRepository from '../repository/menu.repository';
import RoleRepository from '../repository/role.repository';
import CompanyRepository from '../repository/company.repository';
import CountryRepository from '../repository/country.repository';
import StateRepository from '../repository/state.repository';
import CityRepository from '../repository/city.respository';

class AdminService {

    private menuRepository: MenuRepository;
    private roleRepository: RoleRepository;
    private catalogRepository: CatalogRepository;
    private companyRepository: CompanyRepository;
    private countryRepository: CountryRepository;
    private stateRepository: StateRepository;
    private cityRepository: CityRepository;

    constructor() {
        this.menuRepository = new MenuRepository();
        this.roleRepository = new RoleRepository();
        this.catalogRepository = new CatalogRepository();
        this.companyRepository = new CompanyRepository();
        this.countryRepository = new CountryRepository();
        this.stateRepository = new StateRepository();
        this.cityRepository = new CityRepository();
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

    getCountries = () => {
        return this.countryRepository.retrieveAll({});
    }

    getStates = (country: string) => {
        return this.stateRepository.retrieveAll({ country: this.toObjectId(country) });
    }

    getCities = (state: string) => {
        return this.cityRepository.retrieveAll({ state: this.toObjectId(state) });
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}

Object.seal(AdminService);
export = AdminService;