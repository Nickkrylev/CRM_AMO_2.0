const router = require("express").Router();
router.use("/clients", require("./clients.routes"));
module.exports = router;