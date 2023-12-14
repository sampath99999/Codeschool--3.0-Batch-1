
// let params = new URLSearchParams(location.search);
// if (params.get("error")) {
//     alert(params.get("error"));
//     window.history.replaceState(null, "", window.location.pathname);
// }

if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

$.ajax({
    url: "./api/getUser.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        console.log(response);
        $("h1").text(`welcome,${response.data.user[0].first_name}`)
        if (response.data.user.activity =="inactive"){
            localStorage.clear();
        }
        if (response.data.user.user_type == "admin"){
            $("#users").html(`<a href='./users.html' class=" text-white ">Users</a>`)
            console.log("admin")
        }
        
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./login.html?error=" + data.message;
    },
});

function logout() {
    localStorage.clear();
}