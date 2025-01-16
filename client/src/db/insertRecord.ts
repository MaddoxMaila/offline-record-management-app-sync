import SQLite from ".";
import { RecordItem } from "../interfaces/record.interface";

const db = new SQLite()

export async function insertRecord(record: Omit<RecordItem, "updated_at">): Promise<void> {
  if (!record.id || !record.title || !record.description || !record.barcode) {
    throw new Error("All fields except 'updated_at' are required.");
  }

  db.executeQuery(
    `
    INSERT INTO RecordItem (id, title, description, barcode)
    VALUES (?, ?, ?, ?);
    `,
    [record.id, record.title, record.description, record.barcode]
  );
  db.closeDB()
}
