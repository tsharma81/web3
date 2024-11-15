/********************************************************************************
*  WEB322 – Assignment 04
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure views directory is set
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
  res.render("home", { page: '/' });
});

// Routes for about page
app.get("/about", (req, res) => {
  res.render("about", { page: '/about' });
});

// Routing the projects with sector filter
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  if (sector) {
    projectData.getProjectsBySector(sector)
      .then(projects => res.render("projects", { projects, page: '/solutions/projects' }))
      .catch(err => res.status(404).render("404", { message: err.message, page: '/404' }));
  } else {
    projectData.getAllProjects()
      .then(projects => res.render("projects", { projects, page: '/solutions/projects' }))
      .catch(err => res.status(404).render("404", { message: err.message, page: '/404' }));
  }
});

// Route for individual project details
app.get("/solutions/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10);

  projectData.getProjectById(projectId)
    .then(project => res.render("project", { project, page: '/solutions/projects' }))
    .catch(err => res.status(404).render("404", { message: err.message, page: '/404' }));
});

// 404 error page for unmatched routes
app.use((req, res) => {
  res.status(404).render("404", { message: "The requested route was not found.", page: '/404' });
});



app.get('/solutions/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id == projectId); // Find the project by its ID

  if (project) {
    res.render('project', { project: project });
  } else {
    res.status(404).send('Project not found');
  }
});

