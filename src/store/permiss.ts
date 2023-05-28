import { defineStore } from "pinia";

export const usePermissStore = defineStore('permiss',{
    state: () => {
        const keys = localStorage.getItem('ms_keys');
        return {
            key: keys ? JSON.parse(keys) : <string[]>[],
        }
    }
})