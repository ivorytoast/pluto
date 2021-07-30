<script>
    import Square from './Square.svelte';

    let state = {
        board: [
            ['🏁', 'B', '9', '4', '2', '8', '4', '6', 'B', '10'],
            ['5', '4', '3', '4', '2', '8', '4', '6', 'B', '10'],
            ['6', '7', '8', '4', '2', '8', '4', '6', 'B', '10'],
            ['E', 'T', 'T', '4', '2', '8', '4', '6', 'B', '10'],
            ['E', 'T', 'T', '4', '2', '8', '4', '6', 'B', '10'],
            ['E', 'T', 'T', '4', '2', '8', '4', '6', 'B', '10'],
            ['E', 'T', 'T', '4', '2', '8', '4', '6', 'B', '10'],
            ['8', '7', '6', '4', '2', '8', '4', '6', 'B', '10'],
            ['2️', '2️', '2️', '4', '2', '8', '4', '6', 'B', '10'],
            ['🏁', 'B', '9', '4', '2', '8', '4', '6', 'B', '10']
        ],
        players: [
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
        ],
        xIsNext: true,
    }

    let numOfRows = state.board.length
    let numOfCols = state.board[0].length

    function handleClick(row, col) {
        state.board[row][col] = state.xIsNext ? 'X' : 'O';
        state.xIsNext = !state.xIsNext;
    }

    function getPlayerColor(row, col) {
        let side = state.players[row][col]

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

<div class="status">Next player: {state.xIsNext ? 'X' : 'O'}</div>
<div class="grid grid-rows-{numOfRows} grid-cols-1">
    {#each state.board as row, i}
        <div class="grid grid-rows-1 grid-cols-{numOfCols}">
            {#each row as value, j}
                <Square value={value} playerColor={getPlayerColor(i, j)} on:click={e => handleClick(i, j)}/>
            {/each}
        </div>
    {/each}
</div>

<style>
</style>