
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const OxygenError = require("../utils/OxygenError");
const createToken = require("../utils/Tokens");
const AuthValidator = require("../utils/validators/AuthValidator");
const userModel = require("../models/UserModel");



// @desc    Get user
// @route   GET /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ username: req.body.username }).exec();

  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    res.status(404).json({ errors:[new Error("Incorrect username or password ")]});
  }else
  {
    user.active=true;
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ user: user,token:token });
  }
});

// @desc  make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  const authValidator = new AuthValidator();

  const token = authValidator.getToken(req.headers.authorization);
  const decoded = authValidator.tokenVerification(token);
  const currentUser = await authValidator.checkCurrentUserExist(decoded);
  authValidator.checkCurrentUserIsActive(currentUser);
  req.user = currentUser;
  next();
});

//desc  Authorization (User Permissions)
exports.allowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
    
      res.status(403).json({ errors: [new Error("you are not allowed to access this route")]});
    }
    next();
  });




// @desc     Logout
// @route   GET /api/auth/logout
// @access  User logged
exports.logout = asyncHandler(async (req, res, next) => {
  // 1) get user based on email
  const user = await userModel.findOne({ username: req.body.username });

  if (!user) {

      res.status(404).json({ errors: [new Error(`There is no user with this name ${req.body.username}`)]});

  }else{  
        user.active=false;
        await user.save();
        //respondemos sin el token
        res.status(200).json({ data: user });
  }
});