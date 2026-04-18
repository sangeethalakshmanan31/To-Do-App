let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//  save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  render tasks
function renderTasks() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    //  completed style
    if (task.completed) {
      li.classList.add("completed");
    }

    //  toggle complete
    li.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    //  EDIT button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function (event) {
      event.stopPropagation();

      let newText = prompt("Edit task:", task.text);

      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    // DELETE button
    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function (event) {
      event.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    //  append buttons
    li.appendChild(editBtn);
    li.appendChild(btn);

    list.appendChild(li);
  });
}

// add task
function addTask() {
  let input = document.getElementById("input");
  let value = input.value.trim();

  // validation
  if (value === "") {
    alert("Please enter a valid task");
    return;
  }

  //  duplicate check
  let exists = tasks.some(task => task.text === value);
  if (exists) {
    alert("Task already exists");
    return;
  }

  tasks.push({
    text: value,
    completed: false
  });

  saveTasks();
  renderTasks();

  input.value = "";
}

// enter key support
document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

//  load tasks on start
renderTasks();