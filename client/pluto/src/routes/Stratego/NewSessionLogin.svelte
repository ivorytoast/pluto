<script>

    import {state} from "../../stores/stratego-store";
    import {player} from "../../stores/stratego-store";
    import {user} from "../../stores/user-store";
    import {Link, navigate} from "svelte-navigator";
    import {constants} from "../../stores/constants-store";

    $: loginButtonLabel = "New Game"

    async function newSession() {
        let urlToQuery = $constants.URL + $constants.NEW_SESSION;
        const requestObject = {
            "playerName": $player.name
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
        const newSessionId = await response.text()
        console.log(newSessionId)
        $player.playerSide = 'B'
        $state.session = newSessionId
    }

    function createNewSession() {
        if ($player.name === '') {
            alert("Must input a name to join a session!")
        } else {
            newSession().then(() => {
                navigate("/stratego", {replace: true});
            })
        }
    }
</script>

{$state.session}

<div class="font-sans">
    <div class="relative min-h-screen flex flex-col justify-center items-center">
        <div class="relative max-w-sm w-full">
            <div class="card bg-blue-200 shadow-lg  w-full h-full rounded-3xl absolute transform -rotate-6"></div>
            <div class="card bg-red-200 shadow-lg  w-full h-full rounded-3xl absolute transform rotate-6"></div>
            <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                <p class="block pt-7 text-xl text-gray-700 text-center font-semibold">
                    Pluto 🪐
                </p>

                <div>
                    <input bind:value={$player.name} type="text" placeholder="Name"
                           class="mt-7 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                </div>

                <div class="mt-7 mb-4">
                    <button on:click={createNewSession}
                            class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        {loginButtonLabel}
                    </button>
                </div>

                <div class="mt-7 mb-4">
                    <Link to="/game/join"
                          class=" text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        <button class="bg-red-400 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            Join A Game
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>