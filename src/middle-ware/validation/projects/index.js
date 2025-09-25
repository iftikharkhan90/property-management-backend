const {createprojectValidationSchema,patchProjectValidationSchema} = require("./schemma")

const validateCreateProjectRequest = (req, res, next) => {
  let data = req.body;
  const { error, value } = createprojectValidationSchema .validate(data, {
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

const preprocessBody = (req, res, next) => {
  try {
    const data = req.body;
  
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data sent in the request body." });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error while processing request body." });
  }
};


const validateCreatePatchRequest = (req, res, next) => {
  let data = req.body;  
  const { error, value } = patchProjectValidationSchema .validate(data, {
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
 


module.exports = {validateCreateProjectRequest,preprocessBody,validateCreatePatchRequest};