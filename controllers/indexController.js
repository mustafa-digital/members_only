const indexController = {
  get: async (req, res) => {
    res.render("index", {
      title: "Message Board",
      isAuth: req.isAuthenticated(),
      firstName: req.isAuthenticated() ? req.user.firstName : null,
    });
  },
};

module.exports = indexController;
