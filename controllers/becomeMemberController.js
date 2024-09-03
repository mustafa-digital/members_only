/**
 * -------------- becomeMemberController.js ----------------
 */

const { updateMemberStatus } = require("../lib/queries");

const becomeMemberController = {
  get: (req, res, next) => {
    if (res.locals.isAuth) {
      res.render("becomeMember", {
        title: "Become A Member",
      });
    } else {
      res.redirect("/");
    }
  },
  getSuccess: (req, res, next) => {
    if (res.locals.isAuth) {
      res.render("becomeMemberSuccess", {
        title: "Become A Member - Success",
      });
    }
  },
  post: async (req, res, next) => {
    const password = req.body.member_password;
    if (password === "orange") {
      updateMemberStatus(true, req.user.id);
      res.redirect("/become-a-member/success");
    } else {
      res.render("becomeMember", {
        title: "Become A Member",
        errors: [{ msg: "Sorry, that is not the correct password" }],
      });
    }
  },
};

module.exports = becomeMemberController;
