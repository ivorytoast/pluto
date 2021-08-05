<script>
    import Square from './Square.svelte';
    import {state} from '../../stores/stratego-store'

    function getPlayerColor(row, col) {
        let side = $state.players[row][col]

        let gray = '#aaaaaa'
        let red = '#ff3e00';
        let blue = '#000ff0';

        if (side === 'B') {
            return blue;
        } else if (side === 'R') {
            return red;
        } else {
            return gray;
        }
    }

    let pink = "#ffccff"
</script>

<h3>Session ID: {$state.session}</h3>
<h3>Users In Session: {$state.users}</h3>
<h3>Board Rows: {$state.board}</h3>
<h3>Player Rows: {$state.players}</h3>
<h3>Piece Chosen: {$state.pieceChosen}</h3>
<div class="status">Next player: {$state.playerToMove}</div>
<div class="status">Next Nah: {$state.data.length}</div>
<div class="place-items-center grid grid-rows-{$state.data.length} grid-cols-1">
    {#each $state.data as row, i}
        <div class="grid grid-rows-1 grid-cols-{row.length}">
            {#each row as piece, j}
                <Square value={piece.pieceValue} pieceBorderColor="{piece.ownerValue}" x={i} y={j}/>
            {/each}
        </div>
    {/each}
</div>

<style>
</style>