/**
 * -------------- secretMembersPasswordRouter.js ----------------
 */
const secretMembersPasswordController = {
  get: (req, res, next) => {
    if (res.locals.isAuth) {
      res.render("secretMembersPassword", {
        title: "Secret Members Password",
      });
    } else {
      res.redirect("/");
    }
  },
};

module.exports = secretMembersPasswordController;
