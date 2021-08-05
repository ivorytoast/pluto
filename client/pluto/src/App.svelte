<script>
    import {Route, Router} from "svelte-navigator";

    import LogIn from "./routes/LogIn.svelte";
    import CreateAccount from "./routes/CreateAccount.svelte"
    import NotFoundPage from "./routes/NotFoundPage.svelte";
    import Chat from "./routes/Chat.svelte";
    import Lobby from "./routes/Lobby.svelte";
    import Stratego from "./routes/Stratego/Stratego.svelte";
    import Session from "./routes/Session.svelte";
    import {state} from "./stores/stratego-store";
    import {deserialize} from "./serializing/deserializer";
    import {Data} from "./model/data";

    let sessionId = "B1212710"
    let playerName = "Anthony"
    let joinerName = "Luke"
    let fromX = 1
    let fromY = 0
    let toX = 2
    let toY = 0
    let playerSide = "B"

    let URL = "https://proxy.titan-backend-nyc.com"
    // let URL = "http://localhost:8080"

    // Get
    let LATEST_BOARD = "/game/db/board/" // "/game/db/board/{id}"
    let PLAYERS_IN_SESSION = "/game/sessions/players/" // "/game/sessions/players/{id}"

    // Post
    let UPDATE_BOARD = "/game/update/board"
    let MOVE = "/game/move"
    let NEW_SESSION = "/game/v1/new"
    let JOIN_SESSION = "/game/join"

    let latestBoard = ''
    let playersInSession = '...'

    async function getLatestBoard() {
        let data = []
        let urlToQuery = URL + LATEST_BOARD + $state.session;
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
        $state.data = data
        console.log(data)
    }

    async function getPlayersInSession() {
        let urlToQuery = URL + PLAYERS_IN_SESSION + $state.session;
        playersInSession = await (await fetch(urlToQuery)).text()
        console.log("Players in session: " + playersInSession)
        $state.users = playersInSession.split(",")
    }

    function refreshSessionDetails() {
        getLatestBoard($state.session)
        getPlayersInSession($state.session)
    }

    async function newSession(playerName) {
        $state.board = [['a','b','c']]
        let urlToQuery = URL + NEW_SESSION;
        const requestObject = {
            "playerName":playerName
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
        const newSessionId = await response.text()
        console.log(newSessionId)
        $state.session = newSessionId
        refreshSessionDetails()
    }

    async function joinSession(sessionId, playerName) {
        let urlToQuery = URL + JOIN_SESSION;
        const requestObject = {
            "sessionId":sessionId,
            "playerName":playerName
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
        $state.session = sessionId
        refreshSessionDetails()
    }
</script>

<p>Data: [{$state.data.toString()}]</p>

<button on:click={() => newSession(playerName)}>
    New Session
</button> <input bind:value={playerName}>
<br>
<button on:click={() => joinSession(sessionId, joinerName)}>
    Join Session
</button> <input bind:value={sessionId}> <input bind:value={joinerName}>
<br>
<button on:click={() => getLatestBoard()}>
    Latest Board
</button>
<br>
<button on:click={() => getPlayersInSession()}>
    Players
</button>

<Router>
    <main>
        <Route path="session">
            <Session />
        </Route>

        <Route path="stratego">
            <Stratego />
        </Route>

        <Route path="account">
            <CreateAccount />
        </Route>

        <Route path="chat">
            <Chat />
        </Route>

        <Route path="lobby">
            <Lobby />
        </Route>

        <Route path="/">
            <LogIn />
        </Route>

        <Route component="{NotFoundPage}" />
    </main>
</Router>