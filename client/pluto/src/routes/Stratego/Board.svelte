<script>
    import Square from './Square.svelte';
    import {state} from '../../stores/stratego-store'

    let numOfRows = $state.board.length
    let numOfCols = $state.board[0].length

    function handleClick(row, col) {
        $state.board[row][col] = $state.playerToMove === 'B' ? 'R' : 'B'
        $state.playerToMove = $state.playerToMove === 'B' ? 'R' : 'B';
    }

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
</script>

<h3>Session ID: {$state.session}</h3>
<h3>Users In Session: {$state.users}</h3>
<h3>Board: {$state.board}</h3>
<div class="status">Next player: {$state.playerToMove}</div>
<div class="grid grid-rows-{numOfRows} grid-cols-1">
    {#each $state.board as row, i}
        <div class="grid grid-rows-1 grid-cols-{numOfCols}">
            {#each row as value, j}
                <Square value={value} playerColor={getPlayerColor(i, j)} on:click={e => handleClick(i, j)}/>
            {/each}
        </div>
    {/each}
</div>

<style>
</style>