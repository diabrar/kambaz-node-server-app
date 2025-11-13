const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const module = {
    id: 2,
    name: "Module",
    description: "Example of a module",
    course: "CS4550"
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  }
  const setAssignmentCompleted = (req, res) => {
    const { newComp } = req.params;
    assignment.completed = newComp;
    res.json(assignment);
  }
  const getModule = (req, res) => {
    res.json(module);
  }
  const getModuleName = (req, res) => {
    res.json(module.name);
  }
  const setModuleName = (req, res) => {
    const { newTitle } = req.params;
    module.name = newTitle;
    res.json(module);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:newComp", setAssignmentCompleted);
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newTitle", setModuleName);
}
