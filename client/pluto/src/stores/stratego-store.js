import { writable } from 'svelte/store';

export const state = writable({
    data: [], // Make it the combination of board, players, isChosen, etc...
    board: [['B','F'],['1','2']],
    players: [['B','B'],['R','R']],
    playerToMove: 'B',
    session: '',
    users: [],
    pieceChosen: null,
    moveText: ""
})