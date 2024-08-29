/**
 * --------------indexRouter ----------------
 */

// get reference to controller for this route
const indexController = require("../controllers/indexController");

// instantiate the router
const indexRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
indexRouter.get("/", indexController.get);

module.exports = indexRouter;
