/**
 * -------------- createNewMessageController.js ----------------
 */
const { body, validationResult } = require("express-validator");
const { createMessage } = require("../lib/queries");

const MAX_TITLE_LENGTH = 70;
const MAX_MESSAGE_LENGTH = 300;

const messageValidation = [
  body("title")
    .trim()
    .isLength({ max: MAX_TITLE_LENGTH })
    .withMessage(`Title can't be over ${MAX_TITLE_LENGTH} characters long.`),
  body("message")
    .isLength({ max: MAX_MESSAGE_LENGTH })
    .withMessage(
      `Message can't be over ${MAX_MESSAGE_LENGTH} characters long.`,
    ),
];
const createNewMessageController = {
  get: (req, res, next) => {
    res.render("createNewMessage", {
      title: "Create New Message",
    });
  },
  post: [
    messageValidation,
    async (req, res, next) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        // re-render the registration page with errors showing
        return res.status(400).render("create-new-message", {
          title: "Create New Message",
          errors: errors.array(),
        });
      }
      try {
        createMessage(req.user.id, req.body.title, req.body.message);
        res.redirect("/");
      } catch (err) {
        res.status(500);
      }
    },
  ],
};

module.exports = createNewMessageController;
