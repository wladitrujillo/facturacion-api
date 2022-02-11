import { Schema, Types } from "mongoose";
import { IUser, User } from "../model/user";
import RepositoryBase from "./base.repository";

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(User);
    }

    findById(_id: Types.ObjectId): Promise<IUser> {

        return new Promise((resolve, reject) => {
            User.findById(_id)
                .populate("branch")
                .exec((error: any, result: IUser) => {
                    if (error) reject(error)
                    else resolve(result);
                });

        });
    }
}

Object.seal(UserRepository);
export = UserRepository;
