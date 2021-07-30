import { writable } from 'svelte/store';

export const user = writable({
    username: "",
    password: "",
    rememberMe: false
})

export const newUser = writable({
    username: "",
    passwordOne: "",
    passwordTwo: ""
})