function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            password,
        }),
    };

    fetch('http://127.0.0.1:3000/api/enter', requestOptions)
        .then((response) => {
            //alert('New todo item created!');
            //
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('join-form');
if (form.attachEvent) {
    form.attachEvent('submit', processForm);
} else {
    form.addEventListener('submit', processForm);
}
