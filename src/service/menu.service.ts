import MenuRepository from '../repository/menu.repository';

class MenuService {

    private _repository: MenuRepository;

    constructor() {
        this._repository = new MenuRepository();
    }

    retrieveByParent = async (parentId: String, roleId: string) => {
        let menus =
            await this._repository.retrieve({ parent: parentId === '' ? undefined : parentId, roles: { $in: roleId } });
        menus.forEach(m => m.roles=[]);
        return menus;
    }

    retrieveMenu = async (role: string) => {

        let menus = await this.retrieveByParent('', role);

        for (let menu of menus) {
            menu.children = await this.retrieveByParent(menu._id, role);
        }

        return menus;

    }

}

Object.seal(MenuService);
export = MenuService;