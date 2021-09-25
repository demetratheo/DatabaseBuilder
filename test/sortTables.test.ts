import {expect} from "chai";

import {sortTables} from "../src/sortTables";
import {ITable} from "../src/loadDatabase";

import validDb from "./helpers/data/validDatabase.json";
import {generateRandomTables} from "./helpers/functions";

describe("sortTables", () => {
  
  it("Places a table before the table that references it as foreign key", () => {
    const tables: ITable[] = [
      {
        name: "users",
        columns: [
          {name: "firstname", foreign_key: null},
          {name: "role", foreign_key: "roles.id"}
        ]
      },
      {
        name: "roles",
        columns: [
          {name: "id", foreign_key: null},
          {name: "role", foreign_key: null}
        ]
      }
    ]

    const sortedTables = sortTables(tables);

    expect(sortedTables[0].name).to.be.equal("roles");
    expect(sortedTables[1].name).to.be.equal("users");
  });

  it("Rearranges correctly a many to many tables relationship", () => {
    const tables: ITable[] = [
      {
        name: "user_roles",
        columns: [
          {name: "user_id", foreign_key: "users.id"},
          {name: "role_id", foreign_key: "roles.id"},
        ]
      },
      {
        name: "users",
        columns: [
          {name: "id", foreign_key: null},
          {name: "firstname", foreign_key: null},
        ]
      },
      {
        name: "roles",
        columns: [
          {name: "id", foreign_key: null},
          {name: "role", foreign_key: null}
        ]
      }
    ]

    const sortedTables = sortTables(tables);
    expect(sortedTables[0].name).to.be.equal("users");
    expect(sortedTables[1].name).to.be.equal("roles");
    expect(sortedTables[2].name).to.be.equal("user_roles");
  });

  it("Sorts random tables in correct order", () => {
    const tables = generateRandomTables(10);
    const sortedTables = sortTables(tables);

    sortedTables.map((table, i) => {
      table.columns.map((column)=> {
        const foreignKeyIndex = column.foreign_key ?
                                tables.findIndex((t)=> column.foreign_key.includes(t.name)) :
                                null;

        if(foreignKeyIndex != null) {
          expect(i).to.be.greaterThan(foreignKeyIndex);
        }
      });
    });
  });

  it("Sorts given json database tables correctly", () => {
    const sortedTables = sortTables(validDb);

    expect(sortedTables[0].name).to.be.equal("users");
    expect(sortedTables[1].name).to.be.equal("clients");
    expect(sortedTables[2].name).to.be.equal("payment_request");
    expect(sortedTables[3].name).to.be.equal("invoices");
    expect(sortedTables[4].name).to.be.equal("audit_log");
    expect(sortedTables[5].name).to.be.equal("line_items");
  });

});
