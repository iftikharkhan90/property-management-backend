const Joi = require("joi");

const createUserValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  phoneNumber: Joi.string().trim().required(),
  dailyIncome: Joi.number().integer().required(),
  reciveIncome: Joi.number().integer().required(),
});

const patchUserValidationSchema = Joi.object({
  name: Joi.string().trim().optional(),
  phoneNumber: Joi.string().trim().optional(),
  dailyIncome: Joi.number().integer().optional(),
  reciveIncome: Joi.number().integer().optional(),
});

module.exports = { createUserValidationSchema, patchUserValidationSchema };
