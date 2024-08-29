/**
 * -------------- registerController ----------------
 */

const registerController = {
  get: async (req, res) => {
    res.render("register", {
      title: "Registration Page",
    });
  },
  post: async (req, res) => {},
};

module.exports = registerController;
