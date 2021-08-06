import { writable } from 'svelte/store';

export const state = writable({
    data: [],
    playerToMove: 'B',
    session: '',
    users: [],
    pieceChosen: null,
    moveText: "",
    latestBoard: '',
    playersInSession: '...'
})

export const player = writable({
    name: '',
    playerSide: ''
})