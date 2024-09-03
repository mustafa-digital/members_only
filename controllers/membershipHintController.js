/**
 * -------------- membershipHintController.js ----------------
 */
const membershipHintController = {
  get: (req, res, next) => {
    if (res.locals.isAuth) {
      res.render("membershipHint", {
        title: "Super Secret Membership Hint",
      });
    } else {
      res.redirect("/");
    }
  },
};

module.exports = membershipHintController;
