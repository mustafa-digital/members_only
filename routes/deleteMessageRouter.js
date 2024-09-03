/**
 * -------------- deleteMessageRouter.js ----------------
 */
const deleteMessageController = require("../controllers/deleteMessageController");

const deleteMessageRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
deleteMessageRouter.post("/:messageId", deleteMessageController.post);

/**
 * -------------- GET ROUTES ----------------
 */

module.exports = deleteMessageRouter;
