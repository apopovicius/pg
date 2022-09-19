function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
    var task = document.getElementById('todoText').value;
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: task,
            user_id: '1',
        }),
    };

    fetch('http://127.0.0.1:3000/api/todos', requestOptions)
        .then((response) => {
            //alert('New todo item created!');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('add-todo');
if (form.attachEvent) {
    form.attachEvent('submit', processForm);
} else {
    form.addEventListener('submit', processForm);
}

if (window.location.pathname.startsWith('/todos')) {
    $onsolve = $('.item .modify-todo a.solved');
    $onerase = $('.item .modify-todo a.erase');

    $onerase.click(function () {
        var id = $(this).attr('data-id');
        var task = document.getElementById('todoText').value;

        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
        };

        const uri = `http://127.0.0.1:3000/api/todos/${id}`;

        fetch(uri, requestOptions)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                const message = 'Error: ' + error;
                //alert('message');
                console.error(message);
            });
    });

    $onsolve.click(function () {
        var id = $(this).attr('data-id');
        var status = $(this).attr('status');
        var task = 'Value from UI'; // hardcode this value as its not yet treated from server side

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                task: task,
                done: status,
            }),
        };

        fetch(`http://127.0.0.1:3000/api/todos/`, requestOptions)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                const message = 'Error: ' + error;
                //alert('message');
                console.error(message);
            });
    });
}

function redrawTodoList(data) {
    // remove cached list
    const myNode = document.getElementById('todo-list');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

//
//footer section
//
$onactive = $('.footer-todo a.active');
$onactive.click(function () {
    //alert('Display Active only clicked');
    const requestOptions = {
        method: 'GET',
    };

    fetch('http://127.0.0.1:3000/todos/active', requestOptions)
        .then((response) => {
            response.json();
            //alert('On completed finished success');
        })
        .then((data) => redrawTodoList(data))
        .catch((error) => {
            const message = 'Error: ' + error;
            //alert(message);
            console.error(message);
        });
});

$oncompleted = $('.footer-todo  a.completed');
$oncompleted.click(function () {
    //alert('Display completed clicked');
    const requestOptions = {
        method: 'GET',
    };
    fetch('http://127.0.0.1:3000/todos/completed')
        .then((response) => {
            response.json();
            //alert('On completed finished success');
        })
        .then((data) => redrawTodoList(data))
        .catch((error) => {
            const message = 'Error: ' + error;
            //alert(message);
            console.error(message);
        });
});

$onall = $('.footer-todo  a.all');
$onall.click(function () {
    //alert('Display all clicked');
    const requestOptions = {
        method: 'GET',
    };
    fetch('http://127.0.0.1:3000/todos')
        .then((response) => {
            //alert('On all finished success');
            response.json();
        })
        .then((data) => redrawTodoList(data))
        .catch((error) => {
            const message = 'Error: ' + error;
            //alert(message);
            console.error(message);
        });
});
