const { check ,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const UserModel = require("../../models/UserModel");


exports.createUserValidator = [
  check("username")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom(async (username) => { // Make the custom validator async
      const user = await UserModel.findOne({ username }); // Await the promise
      if (user) {
        throw new Error("User name already exists");
      }}),
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
exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  check("name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .optional(),
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email address")
    .custom((val, { req }) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          if (user._id.toString() === req.params.id.toString()) {
            return true;
          } else {
            throw new Error("Username already exists");
          }
        }
      })
    )
    .optional(),
    (req, res, next) => {  // Add a middleware to handle validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Or your preferred error response
      }
      next();
    },

];
exports.deleteUserValidator = [
check("id").isMongoId().withMessage("Invalid User id format"),
  (req, res, next) => {  // Add a middleware to handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Or your preferred error response
    }
    next();
  },
];

