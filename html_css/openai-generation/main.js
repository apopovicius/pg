window.onload = function () {
    // get the form and input elements
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var passwordError = document.getElementById('password-error');

    // add a submit event listener to the register form
    registerForm.addEventListener('submit', function (event) {
        // get the values of the password and confirm password inputs
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;

        // check if the passwords match
        if (password !== confirmPassword) {
            // if the passwords don't match, show the error message and prevent the form from submitting
            passwordError.style.display = 'block';
            event.preventDefault();
        }
    });

    // add a click event listener to the register link
    document.getElementById('register-link').onclick = function () {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    };

    // add a click event listener to the login link
    document.getElementById('login-link').onclick = function () {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    };
};
