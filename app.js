/**
 * -------------- MEMBERS-ONLY APP --------------
 * This app is a simple messaging website that will show anonymous messages if the user is not logged in,
 * but will show the usernames when the user is logged in
 */

/**
 * -------------- DEPENDENCIES --------------
 */
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Pool = require("./config/pool");

// need this function to validate password in passport middleware function
const { validatePassword } = require("./lib/passwordUtils");

/**
 * -------------- GENERAL SETUP ----------------
 */
// Create the connection to postgres database session
const pgSession = require("connect-pg-simple")(session);

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static assets folder
app.use(express.static(__dirname + "/public"));

/**
 * -------------- SESSION SETUP ----------------
 */

app.use(
  session({
    store: new pgSession({
      pool: Pool,
      tableName: process.env.DB_SESSION,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 30 days
  }),
);

// START PASSPORT

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      Pool.query(`SELECT * FROM Account WHERE email = ($1)`, [email])
        .then((res) => {
          const account = res.rows[0];
          if (!account) {
            return done(null, false);
          }

          const isValid = validatePassword(password, account.hash);

          if (isValid) {
            return done(null, account);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          done(err);
        });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await Pool.query("SELECT * FROM Account WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ---
// END PASSPORT

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- VIEWS SETUP ----------------
 */
app.set("view engine", "ejs");

/**
 * -------------- ROUTES ----------------
 */
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Listening on port ${PORT}`);
