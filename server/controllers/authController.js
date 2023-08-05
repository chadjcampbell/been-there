const Yup = require("yup");
const pool = require("../db");
const bcrypt = require("bcrypt");

// first check schemas for validity

const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email required")
    .email("Please enter a valid email"),
  password: Yup.string().required().min(6).max(30),
});

const registerSchema = Yup.object({
  name: Yup.string().required("Name required").min(2).max(30),
  email: Yup.string()
    .required("Email required")
    .email("Please enter a valid email"),
  password: Yup.string().required().min(6).max(30),
});

const checkLoginSchema = (req, res, next) => {
  const formData = req.body;
  loginSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send({ error: "Invalid username or password" });
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(422).send({ error: "Invalid username or password" });
      }
    });
};

const checkRegisterSchema = (req, res, next) => {
  const formData = req.body;
  console.log(formData);
  registerSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send({ error: "Registration failed" });
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        next();
      } else {
        res.status(422).send({ error: "Invalid username or password" });
      }
    });
};

// next check the db to finalize login or registration

const loginWithDB = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, email, name, passhash FROM users WHERE users.email=$1",
    [req.body.email]
  );
  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      req.session.user = {
        id: potentialLogin.rows[0].id,
        name: potentialLogin.rows[0].name,
        email: potentialLogin.rows[0].email,
      };
      res.json({
        loggedIn: true,
        user: req.session.user,
      });
    } else {
      res.json({ loggedIn: false, status: "Invalid username or password" });
    }
  } else {
    res.json({ loggedIn: false, status: "Invalid username or password" });
  }
};

const registerWithDB = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT email from users WHERE email=$1",
    [req.body.email]
  );
  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(name, email, passhash) values($1,$2,$3) RETURNING id, name, email",
      [req.body.name, req.body.email, hashedPass]
    );
    req.session.user = {
      id: newUserQuery.rows[0].id,
      name: newUserQuery.rows[0].name,
      email: newUserQuery.rows[0].email,
    };
    res.json({
      loggedIn: true,
      user: newUserQuery.rows[0],
    });
  } else {
    res.json({ loggedIn: false, status: "Email already has an account" });
  }
};

const getLoginStatus = (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.json({
      loggedIn: false,
      user: null,
    });
  }
};

module.exports = {
  checkLoginSchema,
  checkRegisterSchema,
  loginWithDB,
  registerWithDB,
  getLoginStatus,
};
