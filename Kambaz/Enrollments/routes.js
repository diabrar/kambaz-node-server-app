import EnrollmentsDao from "./dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  }

  const enrollMe = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;
    dao.enrollUserInCourse(currentUser._id, courseId);
    res.json({ status: "ok" });
  };

  const unenrollMe = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json({ status: "ok" });
  };

  const findMyCourses = (req, res) => {
    const { userId } = req.params;
    //if (!currentUser) return res.sendStatus(401);
    const courses = dao.findMyEnrollments(userId);
    res.json(courses);
  };

  app.post("/api/users/:userId/enrollments/:courseId", enrollMe);
  app.delete("/api/users/:userId/enrollments/:courseId", unenrollMe);
  app.get("/api/users/:userId/enrollments", findMyCourses); 
  app.get("/api/enrollments", getEnrollments);
}
