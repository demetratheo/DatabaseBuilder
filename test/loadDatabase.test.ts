import {expect} from "chai";

import {loadDatabase} from "../src/loadDatabase";

import invalidDb from "./helpers/data/invalidDatabase.json";
import validDb from "./helpers/data/validDatabase.json";

describe("loadDatabase", () => {
  it("Throws validation error if json file has unknown fields", () => {
    try {
      loadDatabase(invalidDb);
    } catch (error) {
      expect(error.message).to.be.equal('"[0].invalid" is not allowed');
    }
  });

  it("Reads successfully JSON file with the correct format", () => {
    const database = loadDatabase(validDb);

    expect(database).to.be.an("array");
    expect(database[0]).to.have.property("name");
    expect(database[0]).to.have.property("columns");
  });
});
