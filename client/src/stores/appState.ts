import { defineStore } from 'pinia';

export const useAppState = defineStore('appState', {
    state: () => ({
        counter: 0,
    })
});