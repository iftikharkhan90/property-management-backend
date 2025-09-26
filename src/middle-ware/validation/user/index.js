const {
  createUserValidationSchema,
  patchUserValidationSchema,
} = require("./schemma");

const validateCreateUserRequest = (req, res, next) => {
  let data = req.body;
  const { error, value } = createUserValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details[0].message,
    });
  }
  req.validatedData = value;

  next();
};

const validatePatchUserhRequest = (req, res, next) => {
  let data = req.body;
  const { error, value } = patchUserValidationSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details[0].message,
    });
  }
  req.validatedData = value;

  next();
};

module.exports = { validateCreateUserRequest, validatePatchUserhRequest };
