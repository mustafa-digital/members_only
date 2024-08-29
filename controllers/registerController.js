/**
 * -------------- registerController ----------------
 */
const { body, validationResult } = require("express-validator");

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 6;
const alphaErr = "must only contain letters.";
const lengthErrName = `must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
const lengthErrPassword = `Password must contain atleast ${MIN_PASSWORD_LENGTH} characters.`;

/**
 * -------------- INPUT VALIDATION ----------------
 * Checking the inputs from the registration form for validation
 */
const accountValidation = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`First name ${lengthErrName}`),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH })
    .withMessage(`Last name ${lengthErrName}`),

  body("email").isEmail().withMessage("Must use a valid email address."),

  body("password")
    .trim()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(lengthErrPassword),
];

const registerController = {
  get: async (req, res) => {
    res.render("register", {
      title: "Registration Page",
    });
  },
  post: [
    accountValidation,
    async (req, res) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        // re-render the registration page with errors showing
        return res.status(400).render("register", {
          title: "Registration Page",
          errors: errors.array(),
        });
      }

      // if no errors, save the account details in the database, then redirect user to homepage

      res.redirect("/");
    },
  ],
};

module.exports = registerController;
