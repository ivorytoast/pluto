
let URL = "http://proxy.titan-backend-nyc.com/"

// Get
let LATEST_BOARD = "/db/board/" // "/db/board/{id}"
let PLAYERS_IN_SESSION = "/sessions/players/" // "/sessions/players/{id}"

// Post
let UPDATE_BOARD = "/update/board"
let MOVE = "/move"
let NEW_SESSION = "/new/redis"
let JOIN = "/join"

const getLatestBoard = async (sessionId) => {
    let urlToQuery = URL + LATEST_BOARD + sessionId;
    const response = await fetch(urlToQuery)
    console.log(response)
}

const getPlayersInSession = async (sessionId) => {
    let urlToQuery = URL + PLAYERS_IN_SESSION + sessionId;
    const response = await fetch(urlToQuery)
    console.log(response)
}

const latestBoard = getLatestBoard("B1212390")
const playersInSession = getPlayersInSession("B1212390")

console.log(latestBoard)
console.log(playersInSession)

async function doPost(sessionId) {
    let urlToQuery = URL + LATEST_BOARD + sessionId;
    const res = await fetch(urlToQuery, {
        method: 'POST',
        body: JSON.stringify({
            foo,
            bar
        })
    })
}

const json = await res.json()
result = JSON.stringify(json)