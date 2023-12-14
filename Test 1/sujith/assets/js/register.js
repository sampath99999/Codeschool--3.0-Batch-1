if (localStorage.getItem("token")) {
    location.href = "./dashboard.html";
}

function register() {
    let name = $("#name").val();
    let email = $("#userEmail").val();
    let password = $("#UserPassword").val();
    let confirmPassword = $("#confirm-password").val();
    let DOB = $("#DOB").val();
    console.log(name,email,password,confirmPassword,DOB);
    
    $.ajax({
        url: "./api/register.php",
        method: "POST",
        data: {
            name,
            email,
            password,
            confirmPassword,
            DOB
        },
        success: (response) => {
            response = JSON.parse(response);
            if (!response.status) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
                return false;
            }
            location.href = "./login.html";
        },
        error: (response) => {
            console.log(response);
        },
    });
}
