<script>
    import {Link} from "svelte-navigator";
    import {newUser} from "../stores/user-store";

    let loading = false
    let createButtonLabel = "Create Account"
    let debugMessage = "..."
    let rememberMe = false

    function submitData() {
        this.loginButtonLabel = 'Creating Account...'
        this.loading = true;
        this.debugMessage = '...'

        fetch('/v1/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
        }).then(() => {
            this.debugMessage = 'Form successfully submitted!'
        }).catch(() => {
            this.debugMessage = 'Ooops! Something went wrong!'
        }).finally(() => {
            this.loading = false;
            this.loginButtonLabel = 'Create Account'
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
                <form method="POST" action="/login" class="mt-10" on:submit={submitData}>

                    <div>
                        <input bind:value={$newUser.username} type="email" placeholder="Username"
                               class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>

                    <div class="mt-7">
                        <input bind:value={$newUser.passwordOne} type="password" placeholder="Password"
                               class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>

                    <div class="mt-7">
                        <input bind:value={$newUser.passwordTwo} type="password" placeholder="Repeat Password"
                               class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>

                    <div class="mt-7">
                        <button class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" disabled={loading}>
                            {createButtonLabel}
                        </button>
                    </div>

                    <div class="flex mt-7 items-center text-center">
                        <hr class="border-gray-300 border-1 w-full rounded-md">
                        <p class="block font-medium text-sm text-gray-600 w-full">
                            😊
                        </p>
                        <hr class="border-gray-300 border-1 w-full rounded-md">
                    </div>

                    <div class="mt-4">
                        <div class="flex justify-center items-center">
                            <p class="mr-2">Already Have An Account?</p>
                        </div>
                        <Link to="/" class="flex justify-center items-center mt-1 text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            Log In
                        </Link>
                        <p class="flex justify-center text-sm items-center mt-1">{$newUser.username}, {$newUser.passwordOne}
                            , {$newUser.passwordTwo}, {debugMessage}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>

<style>
</style>