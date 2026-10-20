const {
    getUser,
    createUser,
    deleteUser,
  } = require("../services/UserService");

  const authService = require("../services/AuthService");
  const {createUserValidator,getUserValidator,deleteUserValidator} = require("../utils/validators/UserValidator");
  const router = require("express").Router();

/** Cualquier usuario puede crear una cuenta*/ 
 router.post(
    "/addUser",
    createUserValidator,
    createUser
  );

  router.post(
    "/deleteUser",
    authService.protect,
    authService.allowTo("admin"),
    deleteUserValidator,
    deleteUser
  );

  router.get(
    "/:userId",
    authService.protect,
    authService.allowTo("admin"),
    getUserValidator,
    getUser
  ); 
  module.exports = router;