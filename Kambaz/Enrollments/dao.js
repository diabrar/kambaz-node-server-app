import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }
  function findMyEnrollments(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }
  return { findAllEnrollments, enrollUserInCourse, unenrollUserFromCourse, findMyEnrollments };
}
