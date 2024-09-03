/**
 * -------------- deleteMessageController.js ----------------
 */
const { deleteMessage } = require("../lib/queries");

const deleteMessageController = {
  post: async (req, res, next) => {
    const messageId = req.params.messageId;
    // remove the message from the db
    try {
      await deleteMessage(messageId);
      res.redirect("/view-messages");
    } catch (err) {
      res.status(500);
      next(err);
    }
  },
};

module.exports = deleteMessageController;
