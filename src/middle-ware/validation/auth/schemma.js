const Joi = require("joi");

const loginValidationSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required()
});

module.exports = {loginValidationSchema}