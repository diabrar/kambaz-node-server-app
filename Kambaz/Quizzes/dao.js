import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao(db) {
  function findAllQuizzes() {
    return model.find();
  }
  function findQuizById(quizId) {
    return model.findById(quizId);
  }
  function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }
  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
  }
  function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }
  function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
  }
  function publishQuiz(quizId) {
    const quiz = model.findById(quizId);
    quiz.published = !quiz.published;
    return quiz.save();
  }
  return {
    findQuizById,
    publishQuiz,
    findAllQuizzes,
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
  };
}
