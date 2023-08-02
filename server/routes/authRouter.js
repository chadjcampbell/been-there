const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
  email: Yup.string()
    .required("Email required")
    .email("Please enter a valid email"),
  password: Yup.string().required().min(6).max(30),
});

router.post("/login", (req, res) => {
  const formData = req.body;
  formSchema.validate(formData).catch((err) => console.error(err.errors));
});

module.exports = router;
