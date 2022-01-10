import { Schema } from "mongoose";
import { IUser, User } from "../model/user";
import RepositoryBase from "./base.repository";

class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(User);
    }
}

Object.seal(UserRepository);
export = UserRepository;
