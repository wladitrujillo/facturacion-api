import { IState, State } from "../model/state";
import RepositoryBase from "./base.repository";

class StateRepository extends RepositoryBase<IState> {
    constructor() {
        super(State);
    }
}

Object.seal(StateRepository);
export = StateRepository;