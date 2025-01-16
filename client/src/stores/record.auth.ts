import { defineStore } from "pinia";
import { RecordItem } from "../interfaces/record.interface";


export const useRecordStore = defineStore('recordItem', {
    state: () => ({
        records: [] as RecordItem[]
    }),
    actions: {
        
    }
})