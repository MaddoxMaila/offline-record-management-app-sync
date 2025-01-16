import initSqlJs, { Database, SqlJsStatic } from "sql.js";


export default class SQLite {

    private db: Database | null = null

    public async initializeDB(existingFile?: Uint8Array): Promise<void> {
        const SQL: SqlJsStatic = await initSqlJs({
            locateFile: () => '/sql-wasm.wasm', // Provide the wasm file path
        });

        if (existingFile) {
            this.db = new SQL.Database(existingFile); // Load database from file
            console.log("Database loaded from file.");
        } else {
            this.db = new SQL.Database(); // Create a new database
            console.log("New SQLite Database initialized!");
        }
    }

    public executeQuery(query: string, params: any[] = []): any {
        if (!this.db) {
            throw new Error("Database not initialized. Call initializeDB first.");
        }

        try {
            const result = this.db.exec(query, params);
            return result;
        } catch (error) {
            console.error("Error executing query:", error);
            throw error;
        }
    }

    public exportDB(): Blob {
        if (!this.db) {
            throw new Error("Database not initialized. Call initializeDB first.");
        }

        const data = this.db.export();
        return new Blob([data], { type: "application/octet-stream" });
    }

    public createTables(): void {

        if(!this.db) throw new Error("Database not initialized")
            

    }

    public closeDB(): void {
        if (this.db) {
            this.db.close();
            console.log("Database closed.");
        }
    }


}
