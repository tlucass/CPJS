const tasks = [];

const addButton = document.querySelector("#addButton");
const buttonImportance = document.querySelector("#buttonImportance");




function updateList(taskList = tasks) {
    const listElement = document.querySelector("#listaTarefa");
    listElement.innerHTML = '';

    //iterar por todas as tarefas em taskList
    taskList.forEach(task => {
        //Para cada tarefa, é criado um elemento li
        const listItem = document.createElement("li");
        //O conteúdo do item é preenchido com informações sobre a tarefa, incluindo descrição, autor, departamento e importância. 
        listItem.textContent = `${task.description} - ${task.author} - ${task.department} - ${task.importance}`;
        //Se a tarefa tiver um valor e duração, essas informações também são adicionadas ao texto do item.
        if (task.value) listItem.textContent += ` - ${task.value}`;
        if (task.duration) listItem.textContent += ` - ${task.duration}`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = " X ";
        listItem.appendChild(deleteButton);

        listElement.appendChild(listItem);

        deleteButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            //Encontra o índice da tarefa no array tasks
            let index = tasks.indexOf(task);

            //Verifica se a tarefa que está sendo excluída realmente existe no array tasks. Se a tarefa não existir (ou seja, index for -1), a exclusão não é realizada, evitando erros.
            if (index !== -1) {
                //Se a condição anterior for verdadeira, utiliza o método splice() para remover a tarefa do array tasks. 
                tasks.splice(index, 1); //O primeiro argumento, index, é o índice da tarefa que desejamos remover no array. O segundo argumento, 1, especifica quantos elementos devem ser removidos a partir do índice especificado. 
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





addButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Coleta os valores dos campos do formulário e  e armazen em variáveis JavaScript.
    const description = document.querySelector("#description").value;
    const author = document.querySelector("#author").value;
    const department = document.querySelector("#department").value;
    const value = document.querySelector("#value").value;
    const duration = document.querySelector("#duration").value;
    
    // Coleta todos os elementos com o nome "importance" no formulário. 
    const importanceEl = document.getElementsByName('importance');
    let importance;
    
    //Percorre todos os elementos de entrada de radio com o nome "importance"
    for (const element of importanceEl) {
        if (element.checked) {
            //O valor do elemento selecionado é atribuído à variável importance
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

