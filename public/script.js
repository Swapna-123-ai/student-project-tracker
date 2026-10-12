const form = document.getElementById("project-form");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const projectList = document.getElementById("project-list");
const emptyState = document.getElementById("empty-state");

// Projects exist only while this page is open.
const projects = [];

function renderProjects() {
  projectList.replaceChildren();

  projects.forEach(function (project) {
    const item = document.createElement("li");

    const title = document.createElement("h3");
    title.textContent = project.name;

    const status = document.createElement("p");
    status.textContent = "Status: " + project.status;

    item.appendChild(title);
    item.appendChild(status);
    projectList.appendChild(item);
  });

  if (emptyState) {
    emptyState.hidden = projects.length > 0;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const projectName = nameInput.value.trim();
  const projectStatus = statusInput.value;

  if (!projectName) {
    nameInput.focus();
    return;
  }

  const project = {
    id: crypto.randomUUID(),
    name: projectName,
    status: projectStatus
  };

  projects.push(project);
  renderProjects();

  nameInput.value = "";
  statusInput.value = "Planned";
  nameInput.focus();
});

renderProjects();