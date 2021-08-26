import { User } from '../../models/user.model';

// Create
export class AddUser {
    static readonly type = '[USER] Add';
    constructor(public payload: User) { }
}

// Read
export class GetUser {
    static readonly type = '[USER] Get';
    constructor(public userId: number) { }
}

// Update
export class EditUser {
    static readonly type = '[USER] Edit';
    constructor(public payload: User) { }
}

// Delete
export class DeleteUser {
    static readonly type = '[USER] Delete';
    constructor(public payload: number) { } // payload = userId
}
