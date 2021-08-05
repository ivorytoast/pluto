
// input = "5~2@F~B~E~5~5~T~5~5~B~F@B~B~E~B~B~E~R~R~R~R@B"

export function serialize(boardInput, playerInput, currentPlayer) {
    let rows = boardInput.length
    let cols = boardInput[0].length

    let dimensions = generateDimensions(boardInput)
    let board = generateBoard(boardInput)
    let players = generatePlayers(playerInput)

    let output = dimensions + "@" + board + "@" + players + "@" + currentPlayer

    return output
}

function doubleToSingle(x, y, cols) {
    return y + (x * cols);
}

function generatePlayers(input) {
    let players = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            players.push(input[i][j])
        }
    }
    return players.join("~")
}

function generateBoard(input) {
    let board = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            board.push(input[i][j])
        }
    }
    return board.join("~")
}

function generateDimensions(input) {
    let rows = input.length
    let cols = input[0].length

    let dimensionsArray = []
    dimensionsArray.push(rows)
    dimensionsArray.push(cols)

    return dimensionsArray.join("~")
}