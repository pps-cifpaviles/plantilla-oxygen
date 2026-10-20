const asyncHandler = require("express-async-handler");
const { hashSync } = require("bcryptjs");
const factory = require("../utils/Factory");
const UserModel = require("../models/UserModel");
const createToken = require("../utils/Tokens");


// @desc    Get Specific user by id
// @route   GET /api/users/:id
// @access  Private/admin
exports.getUser = factory.getOne(UserModel);

// @desc    Create user
// @route   POST /api/users
// @access  Private/admin
exports.createUser = asyncHandler(async (req, res, next) => 
  {     const user = await UserModel.create({
        username:req.body.username,  
        password: hashSync(req.body.password),
        active:false,
        createdAt: Date.now(),
       });
    const token = createToken(user._id);
    res.status(201).json({ data: user, token });
});



// @desc    Change Specific user password
// @route   PUT /api/users/changePassword/:id
// @access  Private/admin
exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: hashSync(req.body.password),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(`No user for this id: ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc    Delete Specific user
// @route   Del /api/users/:id
// @access  Private/admin
exports.deleteUser = factory.deleteOne(UserModel);
