
function sidebar() {

    $('#sideBar').toggleClass('d-none');
    $('#mainContent').toggleClass('col-12');


}


function addEmployee() {
    window.location.replace("http://localhost/testday/addEmployee.html");

}
let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo);

console.log(userInfo, 1234);
let token;
token = localStorage.getItem('token');
token = JSON.parse(token);


// if(userInfo==0){
//  alert('plz do login');
//  window.location.replace("http://localhost/testday/logIn.html");


// }
if (userInfo) {

    $('#logInButton').empty();

    $('#registerButton').empty();
    console.log(userInfo.username, 456);
    $('#user').empty();
    $('#user').text(userInfo.username);





}


else {

    Swal.fire({
        title: 'Error!',
        text: 'You Are  Not Logged In ',
        icon: 'error',
        confirmButtonText: 'Ok'
    })

    // alert("You Are  Not Logged In   ");
      window.location.replace("http://localhost/testday/logIn.html");

    $('#logOutButton').empty();

}

function login() {
    window.location.replace("http://localhost/testday/logIn.html");
}

function register() {
    window.location.replace("http://localhost/testday/register.html");
}
function logout() {
    localStorage.removeItem('user_info');
    localStorage.removeItem('token');
    Swal.fire({

        text: 'Log Out Successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
    // alert("logout successfully");
    window.location.replace('http://localhost/testday/logIn.html');



}


let formData = {
    user_id: userInfo.id,
    token: token
}

$.ajax({
    url: 'api/validateUser.php',
    method: 'POST',
    dataType: 'json',
    data: formData,
    success: function (data) {
        // Swal.fire({

        //     text: data.message,
        //     icon: 'success',
        //     confirmButtonText: 'Ok'
        // })
        if (!data.status) {
            localStorage.clear();
            window.location.replace("http://localhost/testday/logIn.html");
        } else {


        }

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});