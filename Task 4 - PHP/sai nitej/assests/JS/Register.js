if (localStorage.getItem("token")) {
    location.href = "./dashboard.html";
}

function register() {
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();

    // Do the validation

    $.ajax({
        url: "http://localhost/codeSchool/week/api/Register.php",
        method: "POST",
        data: {
            name,
            email,
            password,
        },
        success: (response) => {
            response = JSON.parse(response);
            if (!response.status) {
                alert(response.message);
                return false;
            }
            location.href = "./login.html";
        },
        error: (response) => {
            console.log(response);
        },
    });
}