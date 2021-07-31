<script>
    import {Route, Router} from "svelte-navigator";

    import LogIn from "./routes/LogIn.svelte";
    import CreateAccount from "./routes/CreateAccount.svelte"
    import NotFoundPage from "./routes/NotFoundPage.svelte";
    import Chat from "./routes/Chat.svelte";
    import Lobby from "./routes/Lobby.svelte";
    import Stratego from "./routes/Stratego/Stratego.svelte";
    import Session from "./routes/Session.svelte";

    let sessionId = "B1212710"
    let playerName = "Anthony"
    let joinerName = "Luke"
    let fromX = 1
    let fromY = 0
    let toX = 2
    let toY = 0
    let playerSide = "B"

    // let URL = "https://proxy.titan-backend-nyc.com"
    let URL = "http://localhost:8080"

    // Get
    let LATEST_BOARD = "/game/db/board/" // "/game/db/board/{id}"
    let PLAYERS_IN_SESSION = "/game/sessions/players/" // "/game/sessions/players/{id}"

    // Post
    let UPDATE_BOARD = "/game/update/board"
    let MOVE = "/game/move"
    let NEW_SESSION = "/game/new/redis"
    let JOIN_SESSION = "/game/join"

    let latestBoard = ''
    let playersInSession = '...'

    async function getLatestBoard(sessionId) {
        console.log("Running latest board")
        let urlToQuery = URL + LATEST_BOARD + sessionId;
        latestBoard = await (await fetch(urlToQuery)).text()
    }

    async function getPlayersInSession(sessionId) {
        let urlToQuery = URL + PLAYERS_IN_SESSION + sessionId;
        playersInSession = await (await fetch(urlToQuery)).text()
    }

    async function newSession(sessionId, playerName) {
        let urlToQuery = URL + NEW_SESSION;
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
    }

    async function move(sessionId, playerSide, fromX, fromY, toX, toY) {
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
</script>

<button on:click={() => newSession(sessionId, playerName)}>
    New Session
</button>

<button on:click={() => joinSession(sessionId, joinerName)}>
    Join Session
</button>

<button on:click={() => move(sessionId, playerSide, fromX, fromY, toX, toY)}>
    Move
</button>

<button on:click={() => getLatestBoard(sessionId)}>
    Latest Board
</button>

<button on:click={() => getPlayersInSession(sessionId)}>
    Players
</button>

<p>Board: {latestBoard}</p>
<p>Players In Session {playersInSession}</p>

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