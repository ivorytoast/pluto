<script>
    import Square from './Square.svelte';
    import { state } from '../../stores/stratego-store'
    import { onMount } from 'svelte';
    import { deserialize } from "../../serializing/deserializer";
    import { Data } from "../../model/data";
    import { constants } from "../../stores/constants-store";
    import { player } from "../../stores/stratego-store";

    async function getLatestBoard() {
        let data = []
        let urlToQuery = $constants.URL + $constants.LATEST_BOARD + $state.session;
        let fetchedBoard = await (await fetch(urlToQuery)).text()
        if ($state.latestBoard === fetchedBoard) {
            console.log("Same board, no need to parse...")
            return false;
        }
        $state.latestBoard = fetchedBoard
        let values = deserialize($state.latestBoard)
        let board = values[1]
        let players = values[2]
        for (let i = 0; i < board.length; i++) {
            let tempRow = []
            for (let j = 0; j < board[i].length; j++) {
                tempRow.push(new Data(board[i][j], players[i][j], false))
            }
            data.push(tempRow)
        }
        $state.playerToMove = values[3]
        $state.data = data
        return true
    }

    async function getPlayersInSession() {
        let urlToQuery = $constants.URL + $constants.PLAYERS_IN_SESSION + $state.session;
        $state.playersInSession = await (await fetch(urlToQuery)).text()
        $state.users = $state.playersInSession.split(",")
    }

    function refreshSessionDetails() {
        getLatestBoard()
        .then(value => {
            if (value) {
                getPlayersInSession()
            }
        });
    }

    onMount(async () => {
        refreshSessionDetails()
    });

    function refreshBoard() {
        console.log("Refreshing board details...")
        refreshSessionDetails()
    }

    setInterval(refreshBoard, 2000);
</script>

<div class="flex place-content-center mt-10 mb-10 text-3xl">
    {$state.session}
</div>

<div class="flex place-content-center mb-10">
    {#if $state.playerToMove === "B"}
        <div class="flex-inline border-4 border-green-500 h-10 w-10 rounded-full bg-blue-500"></div>
        <div class="flex-inline bg-opacity-50 ml-5 h-10 w-10 rounded-full bg-red-400"></div>
    {:else if $state.playerToMove === "R"}
        <div class="flex-inline bg-opacity-50 h-10 w-10 rounded-full bg-blue-500"></div>
        <div class="flex-inline border-4 border-green-500 ml-5 h-10 w-10 rounded-full bg-red-400"></div>
    {:else}
        <div class="flex-inline bg-opacity-50 h-10 w-10 rounded-full bg-blue-500"></div>
        <div class="flex-inline bg-opacity-50 ml-5 h-10 w-10 rounded-full bg-red-400"></div>
    {/if}
</div>

<div class="place-items-center grid grid-rows-{$state.data.length} grid-cols-1">
    {#each $state.data as row, i}
        <div class="grid grid-rows-1 grid-cols-{row.length}">
            {#each row as piece, j}
                <Square value={piece.pieceValue} pieceBorderColor="{piece.ownerValue}" x={i} y={j}/>
            {/each}
        </div>
    {/each}
</div>

<div class="flex place-content-center mt-10 mb-10 text-md">
    You are
    {#if $player.playerSide === "B"}
        BLUE
    {:else if $player.playerSide === "R"}
        RED
    {:else}
        a SPECTATOR
    {/if}
</div>

<div class="flex place-content-center mt-10 mb-10 text-md">
    {$state.moveText}
</div>

<style>
</style>