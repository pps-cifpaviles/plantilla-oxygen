const { check,validationResult } = require("express-validator");


exports.loginValidator = [
  check("username")
    .notEmpty()
    .withMessage("username required"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),
     (req, res, next) => {  // Add a middleware to handle validation results
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Or your preferred error response
          }
          next();
        },
];


exports.resetPasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Too short password")
];