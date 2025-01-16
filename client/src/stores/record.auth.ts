import { defineStore } from "pinia";
import { RecordItem } from "../interfaces/record.interface";
import SQLite from "../db";
import { AppError } from "../interfaces/error.interface";
import { getAllRecords } from "../db/getAllRecords";
import { insertRecord } from "../db/insertRecord";

const db = new SQLite()

export const useRecordStore = defineStore('recordItem', {
    state: () => ({
        records: [] as RecordItem[],
        error: {e: false, message: ""} as AppError  
    }),
    actions: {

        async getRecords(){

            try{
                
                this.records = await getAllRecords()

            }catch(e: any){
                this.error.e = true
                this.error.message = e.message
            }

        },
        async addRecord(newRecord: Omit<RecordItem, "updated_at">) {
            await insertRecord(newRecord);
            await this.getRecords(); // Refresh the records
          },
        async insertRecord() {
            await db.executeQuery(`
              INSERT INTO RecordItem (id, title, description, barcode)
              VALUES (?, ?, ?, ?);
            `, ['1', 'Sample Title', 'Sample Description 1', '1234567890']);
            await db.executeQuery(`
                INSERT INTO RecordItem (id, title, description, barcode)
                VALUES (?, ?, ?, ?);
              `, ['2', 'Sample Title', 'Sample Description 2', '1234567891']);
              await db.executeQuery(`
                INSERT INTO RecordItem (id, title, description, barcode)
                VALUES (?, ?, ?, ?);
              `, ['2', 'Sample Title', 'Sample Description 3', '1234567892']);
          },
          async updateRecord() {
            await db.executeQuery(`
              UPDATE RecordItem
              SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?;
            `, ['Updated Title', 'Updated Description', '1']);
          }
    }
})