/**
 * -------------- viewMessagesRouter.js ----------------
 */
const viewMessagesController = require("../controllers/viewMessagesController");

const viewMessagesRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
viewMessagesRouter.get("/", viewMessagesController.get);

module.exports = viewMessagesRouter;
