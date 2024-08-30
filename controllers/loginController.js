/**
 * -------------- loginController.js ----------------
 */
const passport = require("passport");

const loginController = {
  get: async (req, res, next) => {
    res.render("login", {
      title: "Login Page",
    });
  },
  post: [
    passport.authenticate("local"),
    async (req, res, next) => {
      res.redirect("/");
    },
  ],
};

module.exports = loginController;
