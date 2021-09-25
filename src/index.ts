import json from "./database/database.json";
import {loadDatabase} from "./loadDatabase";
import {sortTables} from "./sortTables";

const main = () => {
  const database = loadDatabase(json);
  const tables = sortTables(database);
  tables.map((table) => console.log(table.name));
}

export default main();
