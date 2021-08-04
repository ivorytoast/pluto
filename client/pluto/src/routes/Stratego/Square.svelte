<script>

    import {state} from '../../stores/stratego-store'
    import {deserialize} from "../../serializing/deserializer";

    let URL = "http://localhost:8080"
    let MOVE = "/game/move"
    let LATEST_BOARD = "/game/db/board/" // "/game/db/board/{id}"

    let white = "#ffffff"
    let yellow = "#f0e40a"

    export let value = ''
    export let playerColor = ''
    export let x = -1
    export let y = -1
    export let backgroundColor = white

    let latestBoard = ''
    let playersInSession = '...'

    async function getLatestBoard() {
        console.log("Running latest board: " + $state.session)
        let urlToQuery = URL + LATEST_BOARD + $state.session;
        latestBoard = await (await fetch(urlToQuery)).text()
        let values = deserialize(latestBoard)
        console.log("1:" + values[0])
        console.log("2:" + values[1])
        $state.board = values[0]
        $state.players = values[1]
        $state.playerToMove = values[2]
    }

    class Piece {
        constructor(value, player, x, y) {
            this.value = value;
            this.player = player;
            this.x = x;
            this.y = y;
        }
    }

    async function movePiece(playerSide, fromX, fromY, toX, toY) {
        let urlToQuery = URL + MOVE;
        const requestObject = {
            "sessionId":$state.session,
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
        $state.moveText = await response.text()
    }

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
                movePiece($state.playerToMove, $state.pieceChosen.x, $state.pieceChosen.y, x, y)
                    .then(() => getLatestBoard())
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

    export let pieceBorderColor = ''

    function dynamicallyChangePieceBorderColor() {
        let gray = '#aaaaaa'
        let red = '#ff3e00';
        let blue = '#000ff0';

        if (pieceBorderColor === "B") {
            pieceBorderColor = blue
        } else if (pieceBorderColor === "R") {
            pieceBorderColor = red
        } else {
            pieceBorderColor = gray
        }
    }

    $: pieceBorderColor, dynamicallyChangePieceBorderColor()
</script>

<div class="p-0.5" style="--border-color: {pieceBorderColor}">
    <button on:click={move} style="--background-color: {backgroundColor}">
        {value}
    </button>
</div>

<style>
    button {
        width: 80px;
        height: 50px;
        border-color: var(--border-color);
        background-color: var(--background-color);
        border-radius: 0;
    }
</style>