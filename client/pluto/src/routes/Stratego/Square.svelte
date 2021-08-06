<script>

    import {state} from '../../stores/stratego-store';
    import {player} from "../../stores/stratego-store";
    import {deserialize} from "../../serializing/deserializer";
    import {Data} from "../../model/data";
    import {constants} from "../../stores/constants-store";

    let white = "#ffffff"
    let yellow = "#f0e40a"

    export let value = ''
    export let playerColor = ''
    export let x = -1
    export let y = -1
    export let backgroundColor = white

    let latestBoard = ''
    let playersInSession = '...'

    function toggleChosenBackground() {
        $state.data[x][y].selected = !$state.data[x][y].selected;
    }

    function takeOffBackground(oldX, oldY) {
        $state.data[oldX][oldY].selected = !$state.data[oldX][oldY].selected;
    }

    async function getLatestBoard() {
        let data = []
        let urlToQuery = $constants.URL + $constants.LATEST_BOARD + $state.session;
        latestBoard = await (await fetch(urlToQuery)).text()
        let values = deserialize(latestBoard)
        let board = values[1]
        let players = values[2]
        for (let i = 0; i < board.length; i++) {
            let tempRow = []
            for (let j = 0; j < board[i].length; j++) {
                tempRow.push(new Data(board[i][j], players[i][j], false))
            }
            data.push(tempRow)
        }
        $state.playerToMove = values[3]
        $state.data = data
        $state.pieceChosen = null
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
        let urlToQuery = $constants.URL + $constants.MOVE;
        const requestObject = {
            "sessionId":$state.session,
            "playerSide":playerSide,
            "fromX":fromX,
            "fromY":fromY,
            "toX":toX,
            "toY":toY
        }
        let jsonRequest = JSON.stringify(requestObject)
        const params = {
            headers: {
                'Accept': "application/json, text/plain, */*",
                'Content-Type': "application/json;charset=utf-8"
            },
            body: jsonRequest,
            method: "POST"
        }
        const response = await fetch(urlToQuery, params)
        takeOffBackground(fromX, fromY)
        takeOffBackground(toX, toY)
        $state.moveText = await response.text()
    }

    function move() {
        if ($player.playerSide !== 'B' && $player.playerSide !== 'R') {
            $state.moveText = 'You are a spectator. You are not allowed to move pieces...';
            return;
        }
        if ($state.pieceChosen === null && getPlayerSide(pieceBorderColor) !== $player.playerSide) {
            $state.moveText = 'You can only move pieces you control...';
            return;
        }
        if ($player.playerSide !== $state.playerToMove) {
            $state.moveText = 'It is not your turn to move...';
            return;
        }
        if ($state.pieceChosen === null) {
            toggleChosenBackground()
            $state.pieceChosen = new Piece(value, playerColor, x, y)
        } else {
            if ($state.pieceChosen.x === x && $state.pieceChosen.y === y) {
                toggleChosenBackground()
                $state.pieceChosen = null
            } else {
                movePiece($state.playerToMove, $state.pieceChosen.x, $state.pieceChosen.y, x, y)
                    .then(() => getLatestBoard($state.pieceChosen.x, $state.pieceChosen.y))
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

    $: if ($state.data[x][y].selected) {
        backgroundColor = yellow
    } else {
        backgroundColor = white
    }
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