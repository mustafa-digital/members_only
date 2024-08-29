const indexController = {
  get: async (req, res) => {
    res.render("index", {
      title: "Message Board",
    });
  },
};

module.exports = indexController;
