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
  function updateQuiz(quizId, quiz) {
    return model.updateOne({ _id: quizId }, { $set: quiz });
  }
  function publishQuiz(quizId) {
    const quiz = model.findById(quizId);
    quiz.published = !quiz.published;
    return quiz.save();
  }
  function addQuestion (quizId, question) {
    return model.findOneAndUpdate(
      { _id: quizId },
      { $push: { questions: question } },
      { new: true }
    );
  };

  function updateQuestion (quizId, questionId, updates) {
    return model.findOneAndUpdate(
      { _id: quizId, "questions._id": questionId },
      { $set: { "questions.$": updates } },
      { new: true }
    );
  };

  function deleteQuestion (quizId, questionId) {
    return model.findOneAndUpdate(
      { _id: quizId },
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );
  };
  return {
    findQuizById,
    publishQuiz,
    findAllQuizzes,
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
