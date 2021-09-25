import {ITable} from "../loadDatabase";

export const sortTables = (tables: ITable[]): ITable[] => {
  const tablesCopy = Array.from(tables);
  
  tablesCopy.forEach((table) => {
    table.columns.forEach(({foreign_key}) => {
      const index = tables.findIndex((t)=> t.name === table.name);
      if (foreign_key != null) {
        const foreignKeyTableIndex = tables.findIndex((table) => foreign_key.includes(table.name));
        if(foreignKeyTableIndex > index) {
          const copyTable = tables[foreignKeyTableIndex];
          tables[foreignKeyTableIndex] = table;
          tables[index] = copyTable;
        }
      }
    });
  });

  return tables;
}