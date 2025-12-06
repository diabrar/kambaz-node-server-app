import { v4 as uuidv4 } from "uuid";
import model from "./model.js"

export default function QuizzesDao(db) {
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
    return {
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    };
  }
  