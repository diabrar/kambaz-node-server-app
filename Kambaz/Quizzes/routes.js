import QuizzesDao from "../Quizzes/dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);
  const getQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  }
  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  }
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  }
  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.send(newQuiz);
  }
  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.send(status);
  }
  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  }
  const togglePublish = async (req, res) => {
    try {
      const { quizId } = req.params;
      const currentUser = req.session.currentUser;
      if (!currentUser || currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can publish quizzes" });
      }
      const quiz = await dao.publishQuiz(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  app.put("/api/quizzes/:quizId", togglePublish);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes", getQuizzes);
}