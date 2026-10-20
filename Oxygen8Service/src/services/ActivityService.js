const asyncHandler = require("express-async-handler");
const { hashSync } = require("bcryptjs");
const factory = require("../utils/Factory");
const OxygenError = require("../utils/OxygenError");
const UserModel = require("../models/UserModel");
const ActivityModel = require("../models/ActivityModel");
const TransportTypeModel = require("../models/TransportTypeModel");
const moment = require('moment');

const transportTypes = factory.getAll(TransportTypeModel);

// Function to map the original object to your desired object
async function  mapToObject(doc){
  const transporte = await TransportTypeModel.findById(doc.transportType?._id).lean();
  return {
    distancia: doc.distance,
    tipo_transporte: transporte.name, // Example transformation
    unidad: doc.unit,
    fecha: moment(doc.date).format('DD-MM-YYYY'),
  
  };
}

// Function to map an array of documents
async function mapArrayOfObjects(docs){
  let aux_docs= [];
  if(docs && docs.length > 0){
    for (let index in docs){
      aux_docs.push(await mapToObject(docs[index]));
      }
  }
  return aux_docs;
}

// @desc    Get Specific activity by user and checking i belongs to user
// @route   GET /user/:userId/activity/:activityId
// @access  private/user
exports.getActivityById = asyncHandler(async (req, res, next) => {
    const activity = await ActivityModel.findById(req.params.activityId);
    if (!activity) {
      return next(new OxygenError(`No activity found for this id: ${req.params.activityId}`, 404));
    }
    if (activity.user?._id.toString() != req.params.userId.toString())
    {
        return next(new OxygenError(`Activity ownership error : ${req.params.activityId}`, 404));
    }
    res.status(200).json({ data: activity });
  });

// @desc    /user/:userId/activities
// @route   GET /api/users/:id
// @access  private/user
exports.getActivitiesByUserId = asyncHandler(async (req, res, next) => {
    const activities = await ActivityModel.find({user:req.params.userId});
    res.status(200).json(await mapArrayOfObjects(activities));
  });


// @desc    Create user
// @route   POST /user/:userId/addActivity
// @access  private/user
exports.createActivity = asyncHandler( async (req, res, next) =>{
    const transporte = await TransportTypeModel.find({"name":req.body.tipo_transporte}).lean();
    const activity = {
        transportType: transporte[0]._id ,   // "coche", "autobús", etc.
        distance: Number(req.body.distancia),
        unit: req.body.unidad,
        date: req.body.fecha,
        user: req.params.userId
      }
      ActivityModel.create(activity);
      res.status(200).json({ data: req.body });
})



// @desc    Update Activity 
// @route   PUT "/user/:userId/updateactivity/:activityId"
// @access  Private/user
exports.updateActivity = asyncHandler(async (req, res, next) => {
  const transporte = await transportTypes.map(transport => transport == req.body.tipo_transporte);
  const activity = await ActivityModel.findByIdAndUpdate(
    req.params.activityId,
    {
          transportType: transporte ,   // "coche", "autobús", etc.
          distance: Number(req.body.distancia),
          unit: req.body.unidad,
          date: req.body.fecha,
          user: req.params.userId
    },
    { new: true }
  );
  if (!activity) {
    return next(new OxygenError(`No activity found for this id: ${req.params.activityId}`, 404));
  }
  res.status(200).json({ data: activity });
});

// @desc    Delete Specific activity
// @route   Del /user/:userId/deleteActivity/:activityId
// @access  Private/user
exports.deleteActivity = asyncHandler(async (req, res, next) => {

    const document = await Model.findByIdAndDelete(req.params.activityId);

    if (!document) {
      return next(new OxygenError(`No activity for this id ${id}`, 404));
    }
    // se devuelve una respuesta sin datos
    res.status(204).send();
  });;
