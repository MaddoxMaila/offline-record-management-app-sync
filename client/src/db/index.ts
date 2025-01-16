import initSqlJs, { Database, SqlJsStatic } from "sql.js";


export default class SQLite {

    private db: Database | null = null

    private CREATE_RECORD_ITEM_TABLE: string = "CREATE TABLE RecordItem (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, barcode TEXT NOT NULL UNIQUE, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

    public async initializeDB(existingFile?: Uint8Array): Promise<void> {
        const SQL: SqlJsStatic = await initSqlJs({
            locateFile: () => '/sql-wasm.wasm', // Provide the wasm file path
        })

        if (existingFile) {
            this.db = new SQL.Database(existingFile); // Load database from file
            console.log("Database loaded from file.")
        } else {
            this.db = new SQL.Database(); // Create a new database
            console.log("New SQLite Database initialized!")
        }

        this.createTables();
    }

    public executeQuery(query: string, params: any[] = []): any {
        if (!this.db) {
            throw new Error("Database not initialized. Call initializeDB first.")
        }

        try {
            const r = this.db.exec(query, params)
            return r;
        } catch (error) {
            console.error("Error executing query:", error)
            throw error;
        }
    }

    public exportDB(): Blob {
        if (!this.db) {
            throw new Error("Database not initialized. Call initializeDB first.")
        }

        const data = this.db.export();
        return new Blob([data], { type: "application/octet-stream" })
    }

    public createTables(): void {

        if(!this.db){
            throw new Error("Database not initialized")
        }
        
        const r = this.db.exec(this.CREATE_RECORD_ITEM_TABLE)
        if(!r) {
            throw new Error("Failed to create tables")
        }

    }

    public closeDB(): void {
        if (this.db) {
            this.db.close();
            console.log("Database closed.");
        }
    }


}
