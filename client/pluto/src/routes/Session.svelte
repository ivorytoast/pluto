<script>
    import Chat from "./Chat.svelte";
    import Stratego from "./Stratego/Stratego.svelte";
    import Lobby from "./Lobby.svelte";
</script>

<div class="pt-5 pr-5 pb-5 pl-5 h-full">
    <Stratego />
</div>

<div class="grid grid-cols-1 md:grid-cols-2">
    <div>
        <Lobby />
    </div>
    <div>
        <Chat/>
    </div>
</div>