<script>
    export let value = ''
    export let playerColor = ''
</script>

<div class="p-1" style="--the-color: {playerColor}">
    <button on:click>
        {value}
    </button>
</div>

<style>
    button {
        width: 100%;
        height: 50px;
        border-color: var(--the-color);
        border-radius: 0;
    }
</style>