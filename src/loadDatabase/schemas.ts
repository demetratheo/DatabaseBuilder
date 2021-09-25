import joi from "joi";

const COLUMN_SCHEMA = joi.object({
  name: joi.string().required(),
  foreign_key: joi.string().allow(null).required(),
});

export const DATABASE_SCHEMA = joi.array().items(joi.object({
  name: joi.string().required(),
  columns: joi.array().items(COLUMN_SCHEMA).required(),
}));
