import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from 'src/app/models/user.model';
import { AddUser, DeleteUser } from '../actions/user.actions';

// Create a state model
export class UserStateModel {
    users: User[];
}

// Define a name and default values based on the state model
@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

export class UserState {

    // Create functions to return data, could run a filter to return only specific results
    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    // Handle dispatched actions, payloads are not required
    @Action(AddUser)
    add({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }

    @Action(DeleteUser)
    remove({ getState, patchState }: StateContext<UserStateModel>, { payload }: DeleteUser) {
        patchState({
            users: getState().users.filter(u => u.id !== payload)
        });
    }
}
