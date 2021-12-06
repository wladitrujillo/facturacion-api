import { PageRequest } from '../model/page-request';
import CatalogRepository from '../repository/catalog.repository';
import MenuRepository from '../repository/menu.repository';
import RoleRepository from '../repository/role.repository';
import TableRepository from '../repository/table.repository';

class AdminService {

    private menuRepository: MenuRepository;
    private roleRepository: RoleRepository;
    private catalogRepository: CatalogRepository;
    private tableRepository: TableRepository;

    constructor() {
        this.menuRepository = new MenuRepository();
        this.roleRepository = new RoleRepository();
        this.catalogRepository = new CatalogRepository();
        this.tableRepository = new TableRepository();
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
    retrieveRoles = (...roles: String[]) => {
        return this.roleRepository.retrieve({ _id: { $nin: roles } });
    }

    getCatalogByTableId = (tableId: string) => {
        return this.catalogRepository.retrieveWithCriteria({ table: tableId });
    }

    getTables = (criteria: any, pageRequest: PageRequest) => {
        return this.tableRepository.retrieve(criteria, pageRequest);
    }

    getTableByName = (name: string) => {
        return this.tableRepository.findOne({ name });
    }
}

Object.seal(AdminService);
export = AdminService;