const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Tarefa 1 proj. 1", "Tarefa 2 proj. 1"]
  },
  {
    id: "2",
    title: "Novo projeto 2",
    tasks: ["Tarefa 1 proj. 2", "Tarefa 2 proj. 2"]
  }
];

server.use((req, res, next) => {
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);

  next();

  console.count(`Request`);
});

function checkProjectExists(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Project title is required" });
  }

  return next();
}

function checkProjectInArray(req, res, next) {
  const project = projects[req.params.id];

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  req.project = project;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectInArray, (req, res) => {
  return res.json(req.project);
});

server.post("/projects", checkProjectExists, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(projects);
});

server.put(
  "/projects/:id",
  checkProjectInArray,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
  }
);

server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3333);
