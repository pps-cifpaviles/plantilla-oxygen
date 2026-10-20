const {
    logout,
    login
  } = require("../services/AuthService");

  const {
    loginValidator
  } = require("../utils/validators/AuthValidator");
  
  router = require("express").Router();
  
  router.post("/login", loginValidator, login);
  router.post("/logout",  logout);
  
  
  module.exports = router;