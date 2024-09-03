const indexController = {
  get: async (req, res) => {
    res.render("index", {
      title: "Message Board",
      firstName: res.locals.isAuth ? req.user.firstName : null,
    });
  },
};

module.exports = indexController;
