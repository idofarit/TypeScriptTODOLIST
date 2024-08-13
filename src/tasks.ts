const taskForm = document.querySelector<HTMLFormElement>(".form");

const formInput = document.querySelector<HTMLInputElement>(".form-input");

const taskListElement = document.querySelector<HTMLUListElement>(".list");

type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

tasks.forEach(renderTasks);

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function getTask(e: SubmitEvent) {
  e.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // adding task to list
    addTask(task);
    // rendering tasks
    renderTasks(task);
    // update local storage
    updateStorage();
    formInput.value = "";
    return;
  }
  alert("please enter a description");
}

taskForm?.addEventListener("submit", getTask);

function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

function renderTasks(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  //   checkbox
  const taskCheckBox = document.createElement("input");
  taskCheckBox.type = "checkbox";
  taskCheckBox.checked = task.isCompleted;

  //   toggle checkBox

  taskCheckBox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckBox);
  taskListElement?.appendChild(taskElement);
}

function updateStorage(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
