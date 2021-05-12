import { Player } from '../../models/player.model';

// Create
export class AddPlayer {
    static readonly type = '[PLAYER] Add';
    constructor(public payload: Player) { }
}

// Read
export class GetPlayer {
    static readonly type = '[Player] Get';
    constructor(public playerId: number) { }
}

// Update
export class EditPlayer {
    static readonly type = '[PLAYER] Edit';
    constructor(public payload: Player) { }
}

// Delete
export class DeletePlayer {
    static readonly type = '[Player] Delete';
    constructor(public payload: number) { } // payload = playerId
}
