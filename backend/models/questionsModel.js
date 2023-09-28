const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"]
  },
  answer: {
    type: String,
    required: [true, "Answer is required"]
  },
  number: {
    type: Number,
    required: [true, "Question Number is required"]
  }
});

const Questions = mongoose.model("Question", questionSchema);
module.exports = Questions;
