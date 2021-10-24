import { IUser, User } from "../model/user";
import RepositoryBase from "./base.repository";

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(User);
    }

    getByEmail(email: string) {
        return User.find({ email: email }).populate('enterprise');
    }

    getUserById(_id: string) {
        return User.findById(this.toObjectId(_id))
            .populate('enterprise');           
    }

    getUserByEmailAndEnterprise(email: string, enterprise: string): Promise<IUser> {

        return new Promise((resolve, reject) => {
            User.findOne({ email: email, enterprise: this.toObjectId(enterprise) })
                .populate('enterprise')          
                .exec((error: any, result: IUser) => {
                    if (error) reject(error)
                    else resolve(result);
                });
        })


    }
}

Object.seal(UserRepository);
export = UserRepository;