/**
 * -------------- viewMessagesController.js ----------------
 */
const { getAllMessages } = require("../lib/queries");

const viewMessagesController = {
  get: async (req, res, next) => {
    // get all messages from db
    try {
      const messages = await getAllMessages();
      res.render("viewMessages", {
        title: "View Messages",
        messages: messages,
        isMember: req.user ? req.user.isMember : false,
        isAdmin: req.user ? req.user.admin : false,
      });
    } catch (err) {
      res.status(500);
      next(err);
    }
  },
};

module.exports = viewMessagesController;
