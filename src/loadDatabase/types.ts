
interface ITableColumn {
  name: string;
  foreign_key: string | null;
}

export interface ITable {
  name: string;
  columns: ITableColumn[];
}
