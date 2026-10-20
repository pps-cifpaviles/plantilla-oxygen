const jwt = require("jsonwebtoken");

const ApiError = require("./apiError");
const UserModel = require("../models/UserModel");

class UserAuth{
  //  1) check if token exists, if exists get it
  getToken(authorizationHeader) {
    let token;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
      token = authorizationHeader.split(" ")[1];
    }
    if (!token) {
      throw new ApiError(
        "you are not login, Please login to get access this route",
        401
      );
    }
    return token;
  }

  //  2) Verify token (no changes happend, expired token)
  tokenVerifcation(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  }

  //  3) check if user exists
  async checkCurrentUserExist(decoded) {
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
      throw new ApiError(
        "The user that belong to this token does no longer exist",
        401
      );
    }
    return currentUser;
  }

  checkCurrentUserIsActive(currentUser) {
    if (!currentUser.active) {
      throw new ApiError(
        "The user that belong to this token not active, please activate your account",
        401
      );
    }
    return true;
  }

  
module.exports = UserAuth;