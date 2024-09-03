/**
 * -------------- secretMembersPasswordRouter.js ----------------
 */
const secretMembersPasswordController = require("../controllers/secretMembersPasswordController");
const secretMembersPasswordRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
secretMembersPasswordRouter.get("/", secretMembersPasswordController.get);

module.exports = secretMembersPasswordRouter;
