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

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  return res.json(projects[id]);
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

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
});

server.listen(3333);
