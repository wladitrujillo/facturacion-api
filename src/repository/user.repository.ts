import { IUser, User } from "../model/user";
import RepositoryBase from "./base.repository";

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(User);
    }

    getByEmail(email: string): Promise<IUser> {
        return new Promise((resolve, reject) => {

            User.findOne({ email }, (error: any, result: IUser) => {
                if (error) reject(error)
                else resolve(result)
            });
        });
    }

    getUserById(_id: string): Promise<IUser> {
        return new Promise((resolve, reject) => {

            User.findOne({ _id }, (error: any, result: IUser) => {
                if (error) reject(error)
                else resolve(result)
            });
        });
    }
}

Object.seal(UserRepository);
export = UserRepository;
