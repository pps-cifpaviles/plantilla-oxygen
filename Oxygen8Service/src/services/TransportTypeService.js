const TransportTypeModel = require("../models/TransportTypeModel");
const asyncHandler = require("express-async-handler");


exports.getAll = asyncHandler(async (req, res, next) => {
    const types = await TransportTypeModel.find();
    res.status(200).json({ data: types });
  });