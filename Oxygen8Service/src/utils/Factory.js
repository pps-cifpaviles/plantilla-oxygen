const asyncHandler = require("express-async-handler");
const OxygenError = require("../utils/OxygenError");


exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new OxygenError(`No document for this id ${id}`, 404));
    }
    // se devuelve una respuesta sin datos
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new OxygenError(`No document for this id: ${req.params.id}`, 404)
      );
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });


exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // 1) build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    // 2) execute query
    const document = await query;
    if (!document) {
      return next(
        new OxygenError(`No document for this id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });


exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
     
    const documents = await Model.getAll();
    
    res.status(200).json({ data: documents });
  });