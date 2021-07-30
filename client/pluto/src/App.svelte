<script>
    import {Router, Route, Link} from "svelte-navigator";

    import LogIn from "./routes/LogIn.svelte";
    import CreateAccount from "./routes/CreateAccount.svelte"
    import NotFoundPage from "./routes/NotFoundPage.svelte";
    import Chat from "./routes/Chat.svelte";
    import Lobby from "./routes/Lobby.svelte";
    import Stratego from "./routes/Stratego/Stratego.svelte";
    import Session from "./routes/Session.svelte";
</script>

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