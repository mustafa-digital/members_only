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
  new LocalStrategy(function (username, password, done) {
    console.log({ username });
    Pool.query(`SELECT * FROM users WHERE users.username = ($1)`, [username])
      .then((res) => {
        const user = res.rows[0];
        if (!user) {
          return done(null, false);
        }

        // Function defined at bottom of app.js
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await Pool.query("SELECT * FROM users WHERE id = $1", [
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
app.use("/", indexRouter);
app.use("/register", registerRouter);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Listening on port ${PORT}`);
