import { IRole, Role } from "../model/role";


class RoleRepository {
    constructor() { }

    retrieve(criteria: any): Promise<IRole[]> {

        return new Promise((resolve, reject) => {

            Role.find(criteria, (error: any, result: IRole[]) => {
                if (error) reject(error)
                else resolve(result)
            });

        });
    }


    findById(_id: string): Promise<IRole> {

        return new Promise((resolve, reject) => {
            Role.findById(_id, (error: any, result: IRole) => {
                if (error) reject(error)
                else resolve(result);
            });
        });
    }
}

Object.seal(RoleRepository);
export = RoleRepository;