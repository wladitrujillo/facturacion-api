import RoleRepository from '../repository/role.repository';

class RoleService {

    private _repository: RoleRepository;

    constructor() {
        this._repository = new RoleRepository();
    }  

    retrieve = () => {
        return this._repository.retrieve({ _id: { $nin: ['SUPERADMIN'] } });
    }
}

Object.seal(RoleService);
export = RoleService;