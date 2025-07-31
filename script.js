document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");
  const themeToggleBtn = document.getElementById("toggle-theme");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") html.classList.add("dark");

  themeToggleBtn.addEventListener("click", () => {
    console.log("Toggle button clicked");
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; // clear input
    console.log(tasks);
  });

  function renderTask(task) {
    console.log(task.text);

    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.classList = `flex items-center justify-between p-2 mb-2 bg-neutral-300 text-black rounded-md text-xl w-11/12 mx-auto`;
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span class="flex-1">${task.text}</span>
    <button class="ml-4 px-1 py-1 text-white bg-red-600 hover:bg-red-700 rounded-md">Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      const span = li.querySelector("span");
      if (task.completed) {
        span.classList.add("line-through", "text-green-500", "text-opacity-70");
      } else {
        span.classList.remove(
          "line-through",
          "text-green-500",
          "text-opacity-70"
        );
      }
      task.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
