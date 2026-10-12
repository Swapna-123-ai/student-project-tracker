const form = document.getElementById("project-form");
const projectName = document.getElementById("project-name");
const projectStatus = document.getElementById("project-status");
const projectList = document.getElementById("project-list");

// Load saved projects from the browser
let projects = JSON.parse(
  localStorage.getItem("studentProjects") || "[]"
);

function saveProjects() {
  localStorage.setItem("studentProjects", JSON.stringify(projects));
}

function renderProjects() {
  projectList.innerHTML = "";

  if (projects.length === 0) {
    projectList.textContent = "No projects added yet.";
    return;
  }

  projects.forEach(function (project) {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const statusText = document.createElement("p");

    title.textContent = project.name;
    statusText.textContent = "Status: " + project.status;

    card.appendChild(title);
    card.appendChild(statusText);
    projectList.appendChild(card);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = projectName.value.trim();
  const status = projectStatus.value;

  if (!name) return;

  projects.push({ name, status });
  saveProjects();
  renderProjects();
  form.reset();
});

// Display saved projects when the page opens
renderProjects();