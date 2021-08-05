<script>
    import {Route, Router} from "svelte-navigator";

    import NotFoundPage from "./routes/NotFoundPage.svelte";
    import Stratego from "./routes/Stratego/Stratego.svelte";
    import NewSessionLogin from "./routes/Stratego/NewSessionLogin.svelte";
    import JoinSessionLogin from "./routes/Stratego/JoinSessionLogin.svelte";
</script>

<Router>
    <main>
        <Route path="game/new">
            <NewSessionLogin />
        </Route>

        <Route path="game/join">
            <JoinSessionLogin />
        </Route>

        <Route path="stratego">
            <Stratego />
        </Route>

        <Route path="/">
            <NewSessionLogin />
        </Route>

        <Route component="{NotFoundPage}" />
    </main>
</Router>