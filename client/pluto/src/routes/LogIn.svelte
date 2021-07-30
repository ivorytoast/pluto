<script>
    import {Link} from "svelte-navigator";
    import {user} from "../stores/user-store";

    let loading = false
    let loginButtonLabel = "Log In"
    let debugMessage = "..."
    let rememberMe = false

    function submitData() {
        this.loginButtonLabel = 'Attempting To Log In...'
        this.loading = true;
        this.debugMessage = '...'

        fetch('/v1/auth/login', {
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
            this.loginButtonLabel = 'Log In'
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
                        <input bind:value={$user.username} type="email" placeholder="Username"
                               class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>

                    <div class="mt-7">
                        <input bind:value={$user.password} type="password" placeholder="Password"
                               class="mt-1 pl-3 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                    </div>

                    <div class="mt-7 flex">
                        <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
                            <input bind:checked={$user.rememberMe} id="remember_me" type=checkbox
                                   class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                   name="remember">
                            <span class="ml-2 text-sm text-gray-600">Remember Me</span>
                        </label>

                        <div class="w-full text-right">
                            <a class="underline text-sm text-gray-600 hover:text-gray-900" href="cha">
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <div class="mt-7">
                        <button disabled={loading}
                                class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            {loginButtonLabel}
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
                            <p class="mr-2">No Account?</p>
                            <Link to="account" href="create.html"
                               class=" text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                Create One
                            </Link>
                        </div>
                        <p class="flex justify-center text-sm items-center mt-1">{$user.username}, {$user.password}
                            , {$user.rememberMe}, {debugMessage}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
</style>