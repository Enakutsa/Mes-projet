function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();
    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var li = document.createElement("li");
        li.textContent = taskText;
        taskList.appendChild(li);
        input.value = "";
    } else {
        alert("Veuillez saisir une tâche.");
    }
}