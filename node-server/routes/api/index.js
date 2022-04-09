const { getAllUsers, createNewUser } = require("../../controllers");

const router = require("express").Router();

router.route("/").get(getAllUsers).post(createNewUser);

//export the router
module.exports = router;
