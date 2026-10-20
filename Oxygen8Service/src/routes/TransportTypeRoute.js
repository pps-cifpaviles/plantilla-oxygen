

const {
    getAll
  } = require("../services/TransportTypeService");

router.get("/getAll",  getAll);
module.exports = router;