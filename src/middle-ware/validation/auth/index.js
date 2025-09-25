const adminUser = require("../../../Model/adminUsers.model");
const jwt = require('jsonwebtoken');
const { loginValidationSchema } = require("./schemma");
const { comaprePassword } = require("../../../Module/adminUser/service");


const verifyTokenAndAttachUser = async (req, res, next) => {
  
  if (!req.headers.authorization) {
    return res.status(400).json(
      ( "Unauthorized: No token attached")
    );
  }

  let token = req.headers.authorization.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    const user = await adminUser.findById(req.user.id);
    if (!user) {
      return res.status(400).json("Failed", "User not found");
    }

    req.userId = user?.id;
    req.user = user;

    next();
  } catch (error) {
     return res.status(400).json({
      success: false,
      message: "Invalid token ",
    });
  }
};



const loginValidationRequest = (req, res, next) => {
  let data = req.body;
  const { error, value } = loginValidationSchema.validate(data, {
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

const checkAdminExist = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;

    const user = await adminUser.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user email" });
    }

    const isMatch = await comaprePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user password" });
    }

    req.data = user;
    next();
  } catch (err) {
    console.error("Admin check error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const preprocessLoginBody = (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ message: "No data sent in the request body." });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while processing request body." });
  }
};

module.exports = {
  loginValidationRequest,
  preprocessLoginBody,
  checkAdminExist,
  verifyTokenAndAttachUser
};

