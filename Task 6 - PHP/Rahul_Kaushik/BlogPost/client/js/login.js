if (localStorage.getItem("token")) {
    location.href = "./index.html";
  }

$(document).ready(() => {
    

    const emailInput = $('#email');
    const emailError = $('#emailError');
    const passwordInput = $('#password');
    const passwordError = $('#passwordError');
    
    emailInput.on('input', () => {
        console.log("i am in email validation");
        if (!validateEmail(emailInput.val())) {
            emailError.text("Username Invalid");
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

    $('#loginButton').on('click', () => {
        let email = $('#email').val();
        let password = $('#password').val();
        let role = $('#role').val();

        $.ajax({
            url: 'http://localhost/Codeschool/Task7/BlogPost/server/api/login.php',
            method: 'POST',
            data: {  email, password, role },
            success: (sendResponse) => {
                const response = JSON.parse(sendResponse);
                if (!response.status) {
                    alert(response.message);
                    return false;
                } else {
                    localStorage.setItem("token", response.data.token);
                    if (role == 1) {
                        window.location.href = './dashboard.html';
                    } else if (role == 2) {
                        window.location.href = './admin.html';
                    } else if (role == 3) {
                        window.location.href = './approver.html';
                    } else {
                        alert("Please Enter the Role");
                    }
                    
                    
                }
            },
            error: (sendResponse) => {
                const response = JSON.parse(sendResponse);
                alert(response.message);
            },
        });
    });
});