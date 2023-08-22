const tasks = [];

const addButton = document.querySelector("#addButton");
const buttonImportance = document.querySelector("#buttonImportance");

addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const description = document.querySelector("#description").value;
    const author = document.querySelector("#author").value;
    const department = document.querySelector("#department").value;
    const value = document.querySelector("#value").value;
    const duration = document.querySelector("#duration").value;

    const importanceEl = document.getElementsByName('importance');
    let importance;
    for (const element of importanceEl) {
        if (element.checked) {
            importance = element.value;
            break;
        }
    }

    const task = {
        description,
        author,
        department,
        importance,
        value,
        duration
    };

    tasks.push(task);
    updateList();
});

buttonImportance.addEventListener("click", () => {
    const sortedTasks = tasks.slice().sort((a, b) => {
        const importanceValues = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
        return importanceValues[b.importance] - importanceValues[a.importance];
    });
    updateList(sortedTasks);
});

function updateList(taskList = tasks) {
    const listElement = document.querySelector("#listaTarefa");
    listElement.innerHTML = '';

    taskList.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = `${task.description} - ${task.author} - ${task.department} - ${task.importance}`;
        if (task.value) listItem.textContent += ` - ${task.value}`;
        if (task.duration) listItem.textContent += ` - ${task.duration}`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = " X ";
        listItem.appendChild(deleteButton);

        listElement.appendChild(listItem);

        deleteButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            let index = tasks.indexOf(task);

            if (index !== -1) {
                tasks.splice(index, 1);
            }

            evt.target.parentNode.remove();
        });
    });
    
    document.querySelector("#description").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#department").value = "";
    document.querySelector('input[name="importance"]:checked').checked = false;
    document.querySelector("#value").value = "";
    document.querySelector("#duration").value = "";
}