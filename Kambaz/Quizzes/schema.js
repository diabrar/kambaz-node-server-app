import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    quizType: { type: String, default: "Graded quiz" },
    points: Number,
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: String, enum: ["Yes", "No"], default: "Yes" },
    timeLimit: { type: Number, default: 20 },
    multipleAtts: { type: String, enum: ["Yes", "No"], default: "No" },
    howManyAtts: { type: Number, default: 1 },
    showCorrectAns: { type: String, default: "Immediately" },
    accessCode: String,
    oneQuestionAtATime: { type: String, enum: ["Yes", "No"], default: "Yes" },
    webCamReq: { type: String, enum: ["Yes", "No"], default: "No" },
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    totalQs: { type: Array, default: [] },
  },
  { collection: "quizzes" }
);
export default quizzesSchema;
