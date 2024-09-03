/**
 * -------------- deleteMessageController.js ----------------
 * This controller just deals with posts to /delete-message routes, for admins to delete messages
 */
const { deleteMessage } = require("../lib/queries");

const deleteMessageController = {
  post: async (req, res, next) => {
    const messageId = req.params.messageId;
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
