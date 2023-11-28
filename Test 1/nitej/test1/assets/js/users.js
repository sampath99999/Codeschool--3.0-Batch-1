$.ajax({
    url: "./api/getUser.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        console.log(response);
        response.data.user.forEach(element => {
            $("#table").append(`<tr>
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td>${element.phone}</td>
            <td>${element.gender}</td>
            <td>${element.email}</td>
            <td id="activity"><button class="btn">${element.activity}</button></td>
        </tr>`)
        });
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./login.html?error=" + data.message;
    },
});

function colour(){
    let $val=$("#activity").val()
    if ($val="active"){
        $("#activity").css("background-color","green")
    }
//     else if($("#activity").val()=="inactive"){
//         $("#activity").css("background-color","red")
// }
}
colour()