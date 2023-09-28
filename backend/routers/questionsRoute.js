const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const {
  CreateQuestions,
  GetSingleQuestion,
  EvaluateQuestion
} = require("../controller/questionsController");

router.get(
  "/generate",
  passport.authenticate("jwt", { session: false }),
  CreateQuestions
);
router.get(
  "/single",
  passport.authenticate("jwt", { session: false }),
  GetSingleQuestion
);
router.get("/pdf", (req, res) => {
  const fileName = "nodejs_tutorial.pdf";
  const filePath = path.resolve(__dirname, "../assets/" + fileName);
  res.sendFile(filePath);
});

router.post(
  "/evaluate",
  passport.authenticate("jwt", { session: false }),
  EvaluateQuestion
);

module.exports = router;
