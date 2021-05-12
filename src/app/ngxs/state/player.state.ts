import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Player } from 'src/app/models/player.model';
import { AddPlayer, DeletePlayer } from '../actions/player.actions';

// Create a state model
export class PlayerStateModel {
    players: Player[];
}

// Define a name and default values based on the state model
@State<PlayerStateModel>({
    name: 'players',
    defaults: {
        players: []
    }
})

export class PlayerState {

    // Create functions to return data, could run a filter to return only specific results
    @Selector()
    static getPlayers(state: PlayerStateModel) {
        return state.players;
    }

    // Handle dispatched actions, payloads are not required
    @Action(AddPlayer)
    add({ getState, patchState }: StateContext<PlayerStateModel>, { payload }: AddPlayer) {
        const state = getState();
        patchState({
            players: [...state.players, payload]
        });
    }

    @Action(DeletePlayer)
    remove({ getState, patchState }: StateContext<PlayerStateModel>, { payload }: DeletePlayer) {
        patchState({
            players: getState().players.filter(p => p.playerId !== payload)
        });
    }
}
