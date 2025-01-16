"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var DatabaseSingleton = /** @class */ (function () {
    function DatabaseSingleton() {
        // Never call this constructor directly in code, always call the static method "getDb"
        try {
            DatabaseSingleton.db = new client_1.PrismaClient();
        }
        catch (e) {
            console.log(e);
        }
    }
    DatabaseSingleton.getDb = function () {
        // Main Singleton pattern logic.
        if (!DatabaseSingleton.db)
            new DatabaseSingleton();
        return DatabaseSingleton.db;
    };
    return DatabaseSingleton;
}());
exports["default"] = DatabaseSingleton;
//# sourceMappingURL=DatabaseSingleton.js.map