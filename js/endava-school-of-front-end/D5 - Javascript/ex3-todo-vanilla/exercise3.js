var todoItems = [];

registerInputFormSubmission();
registerOrderButtonClicks();

function registerInputFormSubmission() {
    const form = document.getElementById('form-add-todo');
    form.addEventListener('submit', (event) => {
        console.log('Adding new item in todoList');
        event.preventDefault();

        const todoText = document.getElementById('todo-message').value;
        const todoPriority = document.getElementById('priority').value;
        const submissionDate = new Date();

        var todoItem = {};
        todoItem.text = todoText;
        todoItem.priority = todoPriority;
        todoItem.date = submissionDate.toLocaleString('en-US');

        console.log(todoItem);
        form.reset();
        todoItems.push(todoItem);
        insertTodoItem(todoItem);
    });
}

function insertTodoItem(todoItem) {
    const divToDoList = document.querySelector('.todo-list');
    const divItem = document.createElement('div');
    divItem.className = 'item';
    const header = document.createElement('h4');
    header.innerText = `${todoItem.date} - Priority: ${todoItem.priority}`;
    divItem.append(header);
    const text = document.createElement('div');
    text.className = 'item-text';
    text.innerText = todoItem.text;
    divItem.append(text);

    divToDoList.append(divItem);
}

function registerOrderButtonClicks() {
    const orderByDate = document.querySelector('.order-by-date');

    orderByDate.addEventListener = orderByDate.addEventListener(
        'click',
        (event) => {
            redrawToDoList(false);
        }
    );
    const orderByPrio = document.querySelector('.order-by-priority');
    orderByPrio.addEventListener('click', (event) => {
        redrawToDoList(true);
    });
}

function redrawToDoList(isPriorityOrder) {
    var parent = document.querySelectorAll('.item');
    parent.forEach((el) => el.remove());

    if (isPriorityOrder === true) {
        todoItems.sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            }
            if (a.priority > b.priority) {
                return 1;
            }
            return 0;
        });
    } else {
        todoItems.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
    }
    todoItems.forEach((el) => insertTodoItem(el));
}
