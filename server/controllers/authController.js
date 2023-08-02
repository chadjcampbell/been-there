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
      }
    });
};

const checkRegisterSchema = (req, res, next) => {
  const formData = req.body;
  registerSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send({ error: "Registration failed" });
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        next();
      }
    });
};

// next check the db to finalize login or registration

const loginWithDB = (req, res) => {};

const registerWithDB = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  if (existingUser.rowsCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(email, passhash) values($1,$2) RETURNING id, email, name",
      [req.body.username, hashedPass]
    );
  } else {
    res.json({ loggedIn: false, status: "Email already has an account" });
  }
};

module.exports = {
  checkLoginSchema,
  checkRegisterSchema,
  loginWithDB,
  registerWithDB,
};
