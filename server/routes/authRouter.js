const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
  email: Yup.string()
    .required("Email required")
    .email("Please enter a valid email"),
  password: Yup.string().required().min(6).max(30),
});

router.post("/login", async (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send({ error: "Invalid username or password" });
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        res.status(200).send({ message: "Logged in" });
      }
    });
});

module.exports = router;
