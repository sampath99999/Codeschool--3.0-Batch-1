if (localStorage.getItem("token")) {
    location.href = "./dashboard.html";
}

function register() {
    let first_name = $("#first_name").val();
    let last_name = $("#last_name").val();
    let phone = $("#phone").val();
    let gender = $("#gender").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirm =$("#confirm").val();
    $.ajax({
        url: "./api/register.php",
        method: "POST",
        data: {
            first_name,
            last_name,
            phone,
            gender,
            email,
            password,
            confirm
        },
        success: (response) => {
            response = JSON.parse(response);
            if (!response.status) {
                alert(response.message);
                return false;
            }
            // location.href = "./login.html";
        },
        error: (response) => {
            console.log(response);
        },
    });
}