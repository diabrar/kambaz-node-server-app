import { v4 as uuidv4 } from "uuid";
import model from "./model.js"
export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return model.find();
  }
  function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
  }
  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  function findMyEnrollments(userId) {
    return model.find({ user: userId });
  }
  return { findAllEnrollments, enrollUserInCourse, unenrollUserFromCourse, findMyEnrollments };
}

