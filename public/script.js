const form = document.getElementById("project-form");
const nameInput = document.getElementById("name");
const statusInput = document.getElementById("status");
const projectList = document.getElementById("project-list");
const emptyState = document.getElementById("empty-state");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

// Projects exist only while this page is open.
const projects = [];

let editingId = null;

function resetForm() {
  editingId = null;
  form.reset();
  statusInput.value = "Planned";
  saveButton.textContent = "Add Project";
  cancelButton.hidden = true;
  nameInput.focus();
}

function renderProjects() {
  projectList.replaceChildren();

  projects.forEach(function (project) {
    const item = document.createElement("li");

    const title = document.createElement("h3");
    title.textContent = project.name;

    const status = document.createElement("p");
    status.textContent = "Status: " + project.status;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      const selectedProject = projects.find(function (item) {
        return item.id === project.id;
      });

      if (!selectedProject) {
        return;
      }

      editingId = selectedProject.id;
      nameInput.value = selectedProject.name;
      statusInput.value = selectedProject.status;

      saveButton.textContent = "Save changes";
      cancelButton.hidden = false;
      nameInput.focus();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      const selectedProject = projects.find(function (item) {
        return item.id === project.id;
      });

      if (!selectedProject) {
        return;
      }

      const confirmed = window.confirm(
        'Delete the project "' + selectedProject.name + '"?'
      );

      if (!confirmed) {
        return;
      }

      const projectIndex = projects.findIndex(function (item) {
        return item.id === selectedProject.id;
      });

      if (projectIndex === -1) {
        return;
      }

      projects.splice(projectIndex, 1);

      if (editingId === selectedProject.id) {
        resetForm();
      }

      renderProjects();
    });

    item.appendChild(title);
    item.appendChild(status);
    item.appendChild(editButton);
    item.appendChild(deleteButton);

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

  if (editingId !== null) {
    const selectedProject = projects.find(function (project) {
      return project.id === editingId;
    });

    if (!selectedProject) {
      resetForm();
      return;
    }

    selectedProject.name = projectName;
    selectedProject.status = projectStatus;
  } else {
    const project = {
      id: crypto.randomUUID(),
      name: projectName,
      status: projectStatus
    };

    projects.push(project);
  }

  renderProjects();
  resetForm();
});

cancelButton.addEventListener("click", function () {
  resetForm();
});

renderProjects();