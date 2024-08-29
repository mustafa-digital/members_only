/**
 * --------------registerRouter ----------------
 */
const registerController = require("../controllers/registerController");
const registerRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
registerRouter.post("/", registerController.post);

/**
 * -------------- GET ROUTES ----------------
 */
registerRouter.get("/", registerController.get);

module.exports = registerRouter;
