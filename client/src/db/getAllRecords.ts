import SQLite from ".";
import { RecordItem } from "../interfaces/record.interface";

const db = new SQLite()

export async function getAllRecords(): Promise<RecordItem[]> {
    if (!db) {
      throw new Error("Database not initialized. Call initializeDB first.");
    }
  
    const result = db.executeQuery("SELECT * FROM RecordItem;");
    if (result.length === 0) {
      return []; // No records found
    }
  
    // Parse the result into a usable format
    const rows = result[0].values.map((row: string[]) => ({
      id: row[0] as string,
      title: row[1] as string,
      description: row[2] as string,
      barcode: row[3] as string,
      updated_at: row[4] as string,
    }));
    db.closeDB()
  
    return rows;
  }
  