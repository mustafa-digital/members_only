/**
 * -------------- viewMessagesController.js ----------------
 */
const { getAllMessages } = require("../lib/queries");

const viewMessagesController = {
  get: async (req, res, next) => {
    // get all messages from db
    try {
      const messages = await getAllMessages();
      console.log(messages);
      res.render("viewMessages", {
        title: "View Messages",
        messages: messages,
        isAuth: req.isAuthenticated(),
        isMember: req.user.isMember,
      });
    } catch (err) {
      res.status(500);
      next(err);
    }
  },
};

module.exports = viewMessagesController;
