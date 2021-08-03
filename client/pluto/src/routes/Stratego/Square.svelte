<script>

    import {state} from '../../stores/stratego-store'

    let URL = "http://localhost:8080"
    let MOVE = "/game/move"

    class Piece {
        constructor(value, player, x, y) {
            this.value = value;
            this.player = player;
            this.x = x;
            this.y = y;
        }
    }

    async function movePiece(sessionId, playerSide, fromX, fromY, toX, toY) {
        let urlToQuery = URL + MOVE;
        const requestObject = {
            "sessionId":sessionId,
            "playerSide":playerSide,
            "fromX":fromX,
            "fromY":fromY,
            "toX":toX,
            "toY":toY
        }
        let jsonRequest = JSON.stringify(requestObject)
        console.log(jsonRequest)
        const params = {
            headers: {
                'Accept': "application/json, text/plain, */*",
                'Content-Type': "application/json;charset=utf-8"
            },
            body: jsonRequest,
            method: "POST"
        }
        const response = await fetch(urlToQuery, params)
        const output = await response
        console.log(output)
    }

    let white = "#ffffff"
    let yellow = "#f0e40a"

    export let value = ''
    export let playerColor = ''
    export let x = -1
    export let y = -1
    let backgroundColor = white

    function move() {
        if ($state.pieceChosen === null) {
            toggleChosenBackground()
            $state.pieceChosen = new Piece(value, playerColor, x, y)
        } else {
            if ($state.pieceChosen.x === x && $state.pieceChosen.y === y) {
                toggleChosenBackground()
                $state.pieceChosen = null
            } else {
                let playerSide = getPlayerSide($state.pieceChosen.player)
                console.log(playerSide)
                movePiece($state.session, playerSide, $state.pieceChosen.x, $state.pieceChosen.y, x, y)
            }
        }
    }

    function getPlayerSide(playerColor) {
        let red = '#ff3e00';
        let blue = '#000ff0';

        if (playerColor === red) {
            return "R";
        } else if (playerColor === blue) {
            return "B";
        } else {
            return "E";
        }
    }

    function toggleChosenBackground() {
        if (backgroundColor === "#ffffff") {
            backgroundColor = yellow
        } else {
            backgroundColor = white
        }
    }
</script>

<div class="p-0.5" style="--border-color: {playerColor}">
    <button on:click={move} style="--background-color: {backgroundColor}">
        {value}
    </button>
</div>

<style>
    button {
        width: 40px;
        height: 50px;
        border-color: var(--border-color);
        background-color: var(--background-color);
        border-radius: 0;
    }
</style>