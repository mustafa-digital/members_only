/**
 * -------------- becomeMemberRouter.js ----------------
 */
const becomeMemberController = require("../controllers/becomeMemberController");
const becomeMemberRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
becomeMemberRouter.post("/", becomeMemberController.post);

/**
 * -------------- GET ROUTES ----------------
 */
becomeMemberRouter.get("/", becomeMemberController.get);
becomeMemberRouter.get("/success", becomeMemberController.getSuccess);

module.exports = becomeMemberRouter;
