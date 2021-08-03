import { writable } from 'svelte/store';

export const state = writable({
    board: [['F', 'B'], ['9', '10']],
    players: [['B', 'B'], ['R','R']],
    playerToMove: 'B',
    session: '',
    users: []
})