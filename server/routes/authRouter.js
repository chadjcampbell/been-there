const express = require("express");
const router = express.Router();
const Yup = require("yup");

const formSchema = Yup.object({
  email: Yup.string().required("Email required"),
});

router.post("/login", (req, res) => {});

module.exports = router;
