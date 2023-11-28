if (!localStorage.getItem("token")) {
    location.href = "./SignIn.html";
}
function logout(){
    localStorage.clear();
    location.href = './SignIn.html';
}
$.ajax({
    url: "./backend/validity.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        $("#name").text(response.data.user.name);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./SignIn.html?error=" + data.message;
    },
});