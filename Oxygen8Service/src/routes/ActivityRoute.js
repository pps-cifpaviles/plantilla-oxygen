const {
    getActivitiesByUserId,
    getActivityById,
    createActivity,
    deleteActivity,
    updateActivity
  } = require("../services/ActivityService");

  const {
    createActivityValidator,
    updateActivityValidator,
    deleteActivityValidator
  } = require("../utils/validators/ActivityValidator");
  
  router = require("express").Router();
  
  router.get("/getAll/:userId",  getActivitiesByUserId);
  router.get("/getActivity/:activityId", getActivityById);
  router.post("/addActivity/:userId", createActivityValidator,createActivity);
  router.delete("/deleteActivity/userId/:userId/activityId/:activityId", deleteActivityValidator, deleteActivity);
  router.put("/updateactivity/activityId/:activityId'", updateActivityValidator, updateActivity); 
  module.exports = router;