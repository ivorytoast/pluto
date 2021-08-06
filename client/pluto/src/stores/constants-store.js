
import { writable } from 'svelte/store';

export const constants = writable({
    URL: "https://proxy.titan-backend-nyc.com", // http://localhost:8080"
    LATEST_BOARD: "/game/db/board/", // "/game/db/board/{id}"
    PLAYERS_IN_SESSION: "/game/sessions/players/", // "/game/sessions/players/{id}"
    UPDATE_BOARD: "/game/update/board",
    MOVE: "/game/move",
    NEW_SESSION: "/game/v1/new",
    JOIN_SESSION: "/game/join"
})