export function deserialize(input) {
    // input = "5~2@F~B~E~5~5~T~5~5~B~F@B~B~E~B~B~E~R~R~R~R@B"
    let boardArray = []
    let playersArray = []

    let values = input.split("@")
    let dimensions = values[0].split("~")
    let board = values[1].split("~")
    let players = values[2].split("~")
    let currentPlayer = values[3]

    let rows = dimensions[0]
    let cols = dimensions[1]

    for (let i = 0; i < rows; i++) {
        let tempRow = []
        for (let j = 0; j < cols; j++) {
            tempRow.push(board[doubleToSingle(i, j, cols)])
        }
        boardArray.push(tempRow)
    }

    for (let i = 0; i < rows; i++) {
        let tempRow = []
        for (let j = 0; j < cols; j++) {
            tempRow.push(players[doubleToSingle(i, j, cols)])
        }
        playersArray.push(tempRow)
    }

    console.log("new board: " + boardArray.toString())
    console.log("new players: " + playersArray.toString())
    console.log("current player: " + currentPlayer.toString())

    return [boardArray, playersArray, currentPlayer]
}

function doubleToSingle(x, y, cols) {
    return y + (x * cols);
}