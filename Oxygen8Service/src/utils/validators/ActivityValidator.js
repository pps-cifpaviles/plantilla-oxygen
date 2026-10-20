const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const ActivityModel = require("../../models/ActivityModel");
const TransportTypeModel = require("../../models/TransportTypeModel");
const factory = require("../../utils/Factory");

/*activityType: String,        // "transportation"
    transportType: String,      // "coche", "autobús", etc.
    distance: Number,
    unit: { type: String, default: 'km' },
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
*/
const transportTypes = factory.getAll(TransportTypeModel);
const unitTypes = ['km','mi'];

exports.createActivityValidator = [
  check("transportType")
    .notEmpty()
    .withMessage("Transport Type required")
    .custom( (val)=>  transportTypes.contains(val))
    .withMessage("Transport Type not recognized"),
check("distance")
    .notEmpty()
    .withMessage("Distance value required")
    .isNumeric()
    .withMessage("Distance value must be numeric"),
check("date")
    .notEmpty()
    .withMessage("Date required")
    .isISO8601()
    .withMessage("Formato de la fecha iSO8601 YYYY-MM-DDTHH:mm:ss.sssZ"),
];

exports.updateActivityValidator = [
  check("userId").isMongoId().withMessage("Invalid user id format"),
  check("transportType")
    .notEmpty()
    .withMessage("Transport Type required")
    .custom( (val)=>  transportTypes.contains(val))
    .withMessage("Transport Type not recognized"),

check("distance")
    .notEmpty()
    .withMessage("Distance value required")
    .isNumeric()
    .withMessage("Distance value must be numeric"),

  check("unitTypes")
    .notEmpty()
    .withMessage("Unit Type required")
    .custom((val) => unitTypes.contains(val))
    .withMessage("Unit Type not recognized"), 
    
    check("date")
        .notEmpty()
        .withMessage("Date required")
        .isISO8601()
        .withMessage("Formato de la fecha iSO8601 YYYY-MM-DDTHH:mm:ss.sssZ"),

  check("actityId").isMongoId().withMessage("Invalid activity id format")
        .notEmpty()
        .custom(async (val, { req }) => {
        const user = await ActivityModel.findById(val).then((activity) => {
            if (activity.user?._id.toString() == req.params.userId.toString()) {
                return true;
              } else {
                throw new Error("You do not have permission to access or modify this activity");
              }
            })
        }),
       
];

exports.deleteActivityValidator = [
  check("activityId").isMongoId().withMessage("Invalid Activity id format")
];

