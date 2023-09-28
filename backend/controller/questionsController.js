const fs = require("fs");
const pdf = require("pdf-parse");
const axios = require("axios");
const OpenAI = require("openai");
const Questions = require("../models/questionsModel");
require("dotenv").config();

const pdfFilePath = "./assets/nodejs_tutorial.pdf";
const dataBuffer = fs.readFileSync(pdfFilePath);
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
});

const CreateQuestions = async (req, res, next) => {
  try {
    pdf(dataBuffer)
      .then(async (data) => {
        const textData = data.text;

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content:
                "give me 10 questions and their answers,  for the following paragraphs" +
                textData
            }
          ],
          model: "gpt-3.5-turbo"
        });

        const questions = chatCompletion.choices[0].message.content
          .trim()
          .split("\n");

        await SaveQuestionsToDB(questions);

        res.status(200).json({
          status: "success",
          data: []
        });
      })
      .catch((error) => {
        const err = new Error("unable to create the questions");
        next(err);
      });
  } catch (e) {
    const err = new Error("unable to create the questions");
    next(err);
  }
};

const GetSingleQuestion = async (req, res, next) => {
  try {
    const { number } = req.query;
    const question = await Questions.findOne({ number: parseInt(number) });

    if (!question) {
      const err = new Error("unable to get the question");
      next(err);
    }
    return res.status(200).json({
      status: "success",
      question: question.question
    });
  } catch (e) {
    const err = new Error("unable to get the question");
    next(err);
  }
};

const EvaluateQuestion = async (req, res, next) => {
  try {
    const { number, answer } = req.body;
    const question = await Questions.findOne({ number: parseInt(number) });
    if (!question) {
      const err = new Error("unable to get the question");
      next(err);
    }
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Evaluate the following answer with respect to the answer you gave me for the following question, out of 10\n" +
            "Question : " +
            question.question +
            "\nYour Answer : " +
            question.answer +
            "\nMy Answer : " +
            answer
        }
      ],

      model: "gpt-3.5-turbo"
    });

    const response = chatCompletion.choices[0].message.content;

    const pattern = /(?:You got )?(\d+)\s*(?:out of|\/|from)\s*(\d+)/;

    const match = response.match(pattern);
    let point = null;
    if (match) {
      const numerator = parseInt(match[1]);
      const denominator = parseInt(match[2]);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        point = numerator;
      }
    }

    res.status(200).json({
      status: "success",
      point: point
    });
  } catch (e) {
    const err = new Error("unable to evaluate the question");
    next(err);
  }
};

const SaveQuestionsToDB = async (questions) => {
  const pattern = /\d+.*\b(?:question|questions)\b.*\?/i;
  let i = 0;
  while (i < questions.length && !pattern.test(questions[i])) {
    i++;
  }
  let extractedData = [];
  while (i < questions.length) {
    const questionEntry = questions[i];
    const answerEntry = questions[i + 1];

    if (answerEntry !== undefined) {
      const questionMatch = questionEntry.match(/\*\*Question:\*\*\s*(.*)/i);
      const answerMatch = answerEntry.match(/\*\*Answer:\*\*\s*(.*)/i);

      const question = questionMatch ? questionMatch[1].trim() : "";
      const answer = answerMatch ? answerMatch[1].trim() : "";

      if (question && answer) {
        extractedData.push({ question, answer });
      }
    }
    i += 1;
  }
  extractedData.forEach(async (value, index) => {
    const newQuestion = new Questions({
      question: value.question,
      answer: value.answer,
      number: index + 1
    });
    await newQuestion.save();
  });
};

module.exports = {
  CreateQuestions,
  GetSingleQuestion,
  EvaluateQuestion
};
