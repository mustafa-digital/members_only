/**
 * -------------- membershipHintRouter.js ----------------
 */
const membershipHintController = require("../controllers/membershipHintController");
const membershipHintRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
membershipHintRouter.get("/", membershipHintController.get);

module.exports = membershipHintRouter;
