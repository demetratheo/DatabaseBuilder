import casual from "casual";

import {ITable} from "../../../src/loadDatabase";

export const generateRandomTables = (tablesNumber: number) => {
  let tables:ITable[] = [];
  for (let i = 0; i < tablesNumber; i++) {
    const randomTableIndex = Math.floor(Math.random() * tables.length)
    const foreignKey = tables.length ? `${tables[randomTableIndex].name}.id` : null
    const table: ITable = {
      name: casual.word,
      columns: [
        {name: "id", foreign_key: null},
        {name: casual.word, foreign_key: foreignKey}
      ]
    }
    tables.push(table);
  }
  return tables;
}