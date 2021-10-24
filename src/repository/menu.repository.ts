import { IMenu, Menu } from "../model/menu";


class MenuRepository {

    constructor() { }

    retrieve(criteria: any):Promise<IMenu[]> {

        return new Promise((resolve, reject) => {

            Menu.find(criteria, (error: any, result: IMenu[]) => {
                if (error) reject(error)
                else resolve(result)
            });

        });
    }
   
}

Object.seal(MenuRepository);
export = MenuRepository;