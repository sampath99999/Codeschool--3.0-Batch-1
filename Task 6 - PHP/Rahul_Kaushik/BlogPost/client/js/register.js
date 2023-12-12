if (localStorage.getItem("token")) {
    location.href = "./index.html";
  }

$(document).ready(() => {
    
    const usernameInput = $('#username');
    const usernameError = $('#usernameError');
    const emailInput = $('#email');
    const emailError = $('#emailError');
    const passwordInput = $('#password');
    const passwordError = $('#passwordError');


    usernameInput.on('input', () => {
        console.log("i am in user validation");
        if (!validateUsername(usernameInput.val())) {
            usernameError.text("Username Invalid");
            usernameInput.addClass('is-invalid');
        } else {
            usernameError.text("");
            usernameInput.removeClass('is-invalid').addClass('is-valid');
        }
    });

    function validateUsername(username) {
        return username.length >= 5;
    }
    
    emailInput.on('input', () => {
        console.log("i am in email validation");
        if (!validateEmail(emailInput.val())) {
            emailError.text("Email Invalid");
            emailInput.addClass('is-invalid');
        } else {
            emailError.text("");
            emailInput.removeClass('is-invalid').addClass('is-valid');
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }

    passwordInput.on('input', () => {
        console.log("i am in password validation");
        if (!validatePassword(passwordInput.val())) {
            passwordError.text("Password Invalid");
            passwordInput.addClass('is-invalid');
        } else {
            passwordError.text("");
            passwordInput.removeClass('is-invalid').addClass('is-valid');
        }
    });

    function validatePassword(password) {
        const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}/;
        return passwordRegex.test(password);
    }

    $('#registerButton').on('click', () => {
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let role = $('#role').val();

        $.ajax({
            url: 'http://localhost/Codeschool/Task7/BlogPost/server/api/register.php',
            method: 'POST',
            data: { username, email, password, role },
            success: (sendResponse) => {
                const response = JSON.parse(sendResponse);
                window.location.href = './dashboard.html';
            },
            error: (sendResponse) => {
                const response = JSON.parse(sendResponse);
                alert(response.message);
            },
        });
    });
});