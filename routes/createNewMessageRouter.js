/**
 * -------------- createNewMessageRouter.js ----------------
 */
const createNewMessageController = require("../controllers/createNewMessageController");

const createNewMessageRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
createNewMessageRouter.post("/", createNewMessageController.post);

/**
 * -------------- GET ROUTES ----------------
 */
createNewMessageRouter.get("/", createNewMessageController.get);

module.exports = createNewMessageRouter;
