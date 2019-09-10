const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "2",
    title: "Novo projeto 2",
    tasks: ["Nova tarefa 2"]
  }
];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

server.post("/projects", (req, res) => {
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

server.listen(3333);
