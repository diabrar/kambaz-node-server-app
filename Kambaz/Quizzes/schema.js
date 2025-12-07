import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "fill-in-blank"],
    required: true,
  },
  title: String,
  points: { type: Number, default: 1 },
  question: String,
  choices: [{ text: String, isCorrect: Boolean }],
  correctAnswer: String,
  possibleAnswers: [String],
});

const quizzesSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    quizType: { type: String, default: "Graded quiz" },
    points: { type: Number, default: 100 },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    totalQs: { type: Array, default: [] },
    questions: [questionSchema],
    published: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);
export default quizzesSchema;
