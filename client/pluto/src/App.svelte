<script>
    import {Router, Route, Link} from "svelte-navigator";

    import LogIn from "./routes/LogIn.svelte";
    import CreateAccount from "./routes/CreateAccount.svelte"
    import NotFoundPage from "./routes/NotFoundPage.svelte";
    import Chat from "./routes/Chat.svelte";
    import Lobby from "./routes/Lobby.svelte";
    import Stratego from "./routes/Stratego/Stratego.svelte";
    import Session from "./routes/Session.svelte";

    let sessionId = "B1212390"

    let URL = "https://proxy.titan-backend-nyc.com/"

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
</script>

<button on:click={getPlayersInSession(sessionId)}>
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