<script>

    import {state} from "../../stores/stratego-store";
    import {user} from "../../stores/user-store";
    import {Link, navigate} from "svelte-navigator";

    let URL = "https://proxy.titan-backend-nyc.com"
    // let URL = "http://localhost:8080"
    let JOIN_SESSION = "/game/join"
    let loading = false
    $: loginButtonLabel = "Join " + $state.session

    async function joinSession() {
        let urlToQuery = URL + JOIN_SESSION;
        const requestObject = {
            "sessionId": $state.session,
            "playerName": $user.username
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
        const output = await response
        console.log(output)
    }

    function joinExistingSession() {
        joinSession().then(() => {
            navigate("/stratego", {replace: true});
        })
    }
</script>

<div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div class="relative sm:max-w-sm w-full">
            <div class="card bg-blue-200 shadow-lg  w-full h-full rounded-3xl absolute transform -rotate-6"></div>
            <div class="card bg-red-200 shadow-lg  w-full h-full rounded-3xl absolute transform rotate-6"></div>
            <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                <p class="block pt-7 text-xl text-gray-700 text-center font-semibold">
                    Pluto 🪐
                </p>

                <div>
                    <input bind:value={$state.session} type="text" placeholder="Session ID to Join"
                           class="mt-7 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                </div>

                <div class="mt-7">
                    <button disabled={loading} on:click={joinExistingSession}
                            class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        {loginButtonLabel}
                    </button>
                </div>

                <div class="mt-7 mb-2 items-center text-center">
                    <Link to="/game/new"
                          class=" text-blue-500 text-3xl transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        🔙
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>