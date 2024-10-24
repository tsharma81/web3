/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tanya Sharma Student ID: 159504224 Date: 23/10/2024
*
********************************************************************************/
const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
app.use(express.static('public'));

// Ensure the projects array is initialized before starting the server
projectData.initialize().then(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}).catch(err => {
  console.error("Failed to initialize project data", err);
});

// Routes for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Routes for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Routing the projects with sector filter
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  if (sector) {
    projectData.getProjectsBySector(sector)
      .then(projects => res.json(projects))
      .catch(err => res.status(404).send(err.message));
  } else {
    projectData.getAllProjects()
      .then(projects => res.json(projects))
      .catch(err => res.status(404).send(err.message));
  }
});


app.get("/solutions/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10); 

  projectData.getProjectById(projectId)
    .then(project => res.json(project))
    .catch(err => res.status(404).send(err.message));
});


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.get("/solutions/projects", (req, res) => {
  projectData.getAllProjects()
    .then(projects => res.json(projects))
    .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
  projectData.getProjectById(8)
    .then(project => res.json(project))
    .catch(err => res.status(404).send(err));
});



