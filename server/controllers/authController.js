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

const checkLoginSchema = async (req, res, next) => {
  const formData = req.body;
  loginSchema
    .validate(formData)
    .then((valid) => {
      if (valid) {
        next();
      } else {
        return res.status(400).send({ error: "Invalid username or password" });
      }
    })
    .catch((err) => {
      return res.status(400).send({ error: "Invalid username or password" });
    });
};

const checkRegisterSchema = (req, res, next) => {
  const formData = req.body;
  registerSchema
    .validate(formData)
    .then((valid) => {
      if (valid) {
        next();
      } else {
        return res.status(400).send({ error: "Invalid username or password" });
      }
    })
    .catch((err) => {
      return res.status(400).send({ error: "Registration failed" });
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
      return res.json({
        loggedIn: true,
        user: req.session.user,
      });
    } else {
      return res.json({
        loggedIn: false,
        status: "Invalid username or password",
      });
    }
  } else {
    return res.json({
      loggedIn: false,
      status: "Invalid username or password",
    });
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
    return res.json({
      loggedIn: true,
      user: newUserQuery.rows[0],
    });
  } else {
    return res.json({
      loggedIn: false,
      status: "Email already has an account",
    });
  }
};

const getLoginStatus = (req, res) => {
  if (req.session.user) {
    return res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    return res.json({
      loggedIn: false,
      user: null,
    });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  return res.json({
    loggedIn: false,
    user: null,
  });
};

module.exports = {
  checkLoginSchema,
  checkRegisterSchema,
  loginWithDB,
  registerWithDB,
  getLoginStatus,
  logout,
};
