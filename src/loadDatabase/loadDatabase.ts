import {DATABASE_SCHEMA} from "./schemas";
import {ITable} from "./types";

export const loadDatabase = (json: any): ITable[] => {
  const database = DATABASE_SCHEMA.validate(json);
  if(database.error) {
    throw new Error(database.error.message);
  }
  return database.value;
}
