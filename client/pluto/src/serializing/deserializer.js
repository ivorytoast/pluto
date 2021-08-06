export function deserialize(input) {
    console.log("To deserialize: " + input)
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

    return [dimensions, boardArray, playersArray, currentPlayer]
}

function doubleToSingle(x, y, cols) {
    return y + (x * cols);
}