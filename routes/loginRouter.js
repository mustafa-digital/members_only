/**
 * -------------- loginRouter.js ----------------
 */
const loginController = require("../controllers/loginController");

// get the router object and instantiate it
const loginRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
loginRouter.post("/", loginController.post);

/**
 * -------------- GET ROUTES ----------------
 */
loginRouter.get("/", loginController.get);

module.exports = loginRouter;
