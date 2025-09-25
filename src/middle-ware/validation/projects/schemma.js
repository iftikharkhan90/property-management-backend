const Joi = require("joi");

const createprojectValidationSchema = Joi.object({
  projectName: Joi.string().trim().required(),
  ownerName: Joi.string().trim().required(),
  estimatedStartDate: Joi.date().iso().required(),
  estimatedEndDate: Joi.date().iso().required(),
  city: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});


const patchProjectValidationSchema = Joi.object({
    projectName: Joi.string().trim().optional(),
  ownerName: Joi.string().trim().optional(),
  estimatedStartDate: Joi.date().iso().optional(),
  estimatedEndDate: Joi.date().iso().optional(),
  city: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
})


module.exports = {createprojectValidationSchema,patchProjectValidationSchema};