import { writable } from 'svelte/store';

export const user = writable({
    username: "FakeUser",
    password: "",
    rememberMe: false
})

export const newUser = writable({
    username: "",
    passwordOne: "",
    passwordTwo: ""
})