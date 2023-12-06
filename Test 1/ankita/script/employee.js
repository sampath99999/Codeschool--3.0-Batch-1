

function addEmployee() {
    window.location.replace("http://localhost/testday/addEmployee.html");

}


function register() {
    window.location.replace("http://localhost/testday/register.html");

}

function login() {
    window.location.replace("http://localhost/testday/logIn.html");

}

function logout() {
    localStorage.removeItem('user_info');
    localStorage.removeItem('token');

    Swal.fire({
        title: 'Log Out Successfully ',
        icon: 'success',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
        denyButtonText: ``
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("http://localhost/testday/logIn.html");

        }
    });


}







let empDetail = [];


let working_status = [];
let locations = [];
let working_postions = [];


let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo);

let token;
token = localStorage.getItem('token');
token = JSON.parse(token);
function sidebar() {

    $('#sideBar').toggleClass('d-none');
    $('#mainContent').toggleClass('col-12');



}

if (userInfo) {

    $('#logInButton').empty();

    $('#registerButton').empty();







}


else {
    Swal.fire({

        text: 'You Are  Not Logged Into This Page ',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
    // alert("You Are  Not Logged Into This Page  ");
    window.location.replace("http://localhost/testday/logIn.html");
    $('#logOutButton').empty();

}


$.ajax({
    url: 'api/showEmployee.php',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        empDetail = data.data.empDetails;
        working_status = data.data.working_status;
        locations = data.data.location;
        working_postions = data.data.working_postions;
        addEmpDetails(data.data.empDetail);
        addWorking_status(data.data.working_status);
        addLocation(data.data.location);
        addWorking_postions(data.data.working_postions);


    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});




function addEmpDetails(empDetail) {


    $('#tableData').empty();

    console.log(empDetail);

    for (let i = 0; i < empDetail.length; i++) {
        console.log(2345);

        $('#tableData').append(`
       <tr class="shadow-lg">

                                    <td>
                                    ${empDetail[i].empcode}
                                    </td>
                                    <td> ${empDetail[i].name.toUpperCase()}</td>
                                    
                                    <td> ${empDetail[i].phone}</td>
                                        <td> ${empDetail[i].email}</td>
                                    <td> ${empDetail[i].working_status.toUpperCase()}</td>
                                    <td> ${empDetail[i].location.toUpperCase()}</td>
                                    <td> ${empDetail[i].working_postions.toUpperCase()}</td>

                                    

                                </tr>
        `)
    };
}



function addWorking_status(working_status) {
    $('#working_status').empty();
    $('#working_status').append(`
       <option value="">Select Here</option>
       `)
    for (let i = 0; i < working_status.length; i++) {

        $('#working_status').append(`
        <option value="${working_status[i].id}">${working_status[i].description.toUpperCase()}</option>
        `)

    };
}



function addLocation(locations) {
    $('#location').empty();
    $('#location').append(`
       <option value="">Select Here</option>
       `)
    for (let i = 0; i < locations.length; i++) {

        $('#location').append(`
        <option value="${locations[i].id}">${locations[i].description.toUpperCase()}</option>
        `)

    };
}


function addWorking_postions(working_postions) {
    $('#working_postion').empty();
    $('#working_postion').append(`
       <option value="">Select Here</option>
       `)
    for (let i = 0; i < working_postions.length; i++) {

        $('#working_postion').append(`
        <option value="${working_postions[i].id}">${working_postions[i].description.toUpperCase()}</option>
        `)

    };
}






function addNewEmployee() {

    const spcialPattern = /[!@@#$%^^&*()_>:{<>_(*^$#@!#$^*())}]/;

    let fName = $("#fName").val();
    let lName = $("#lname").val();
    let emailId = $("#email").val();
    let phone = $("#phone").val();
    let working_postions_id = $('#working_postion').val();
    let working_status_id = $('#working_status').val();

    let location_id = $('#location').val();
    $("#lnameError").text("");
    $("#fNameError").text("");
    $("#emailError").text("");
    $("#phoneError").text("");
    $("#locationError").text("");
    $("#working_postionError").text("");
    $("#working_statusError").text("");
    if (working_postions_id == " ") {
        Swal.fire({
            title: 'Error!',
            text: 'Please  Select The  Working position ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please  Select The  Working position");
        $("#working_postionError").text("Please  Select The  Working Position");
        return;
    }

    if (working_status_id == " ") {
        Swal.fire({
            title: 'Error!',
            text: 'Please Select The Working Status ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Select The Working Status");
        $("#working_statusError").text("Please Select The Working Status");
        return;
    }
    if (location_id == " ") {
        Swal.fire({
            title: 'Error!',
            text: 'Please  Select The Location',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please  Select The Location");
        $("#locationError").text("Please  Select The Location");
        return;
    }


    if (!fName) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  First Name ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  First Name");
        $("#fNameError").text("Please Enter The  First Name");
        return;
    }
    if (spcialPattern.test(fName)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  First Name Without Any  Special Symbol ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  First Name Without Any  Special Symbol");
        $("#fNameError").text("Please Enter  The  First Name Without Any  Special Symbol");
        return;
    }

    if (fName.length > 12) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter the  First Name LessThan 12 Character ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter the  First Name LessThan 12 Character");
        $("#fNameError").text("Please Enter the  First Name LessThan 12 Character");
        return;
    }
    if (!lName) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  Last Name ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  Last Name");
        $("#lnameError").text("Please Enter The  Last Name");
        return;
    }
    if (spcialPattern.test(lName)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  Last Name Without Special Symbol ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  Last Name Without Special Symbol");
        $("#lnameError").text("Please Enter The  Last Name Without Special Symbol");
        return;
    }

    if (lName.length > 12) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  Last Name Lessthan 12 Character',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  Last Name Lessthan 12 Character");
        $("#lnameError").text("Please Enter The  Last Name Lessthan 12 Character");
        return;
    }



    if (!phone) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The  Phone Number ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The  Phone Number");
        $("#phoneError").text("Please Enter The  Phone Number");
        return;
    }
    if (phone.length != 10) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The 10 Digit Phone Number ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The 10 Digit Phone Number  ");
        $("#phoneError").text("Please Enter The 10 Digit Phone Number ");
        return;
    }
    if (isNaN(phone)) {
        Swal.fire({
            title: 'Error!',
            text: 'Enter Only Numbers ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Enter Only Numbers");
        $("#phoneError").text("Enter Only Numbers");
        return;
    }
    if (phone.charAt(0) === '0') {
        Swal.fire({
            title: 'Error!',
            text: 'Phone number Should Not Start With Zero',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert('Phone number Should Not Start With Zero');
        $("#phoneError").text('Phone number Should Not Start With Zero');
        return;
    }

    if (!emailId) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Valid Email ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The Valid Email");
        $("#emailError").text("Please Enter The Valid Email");
        return;
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter The Valid Email With @.com ',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        // alert("Please Enter The Valid Email With @.com ");
        $("#emailError").text("Please Enter The Valid Email With @.com ");
        return;
    }

    let formData = {
        working_postions_id: $('#working_postion').val(),
        working_status_id: $('#working_status').val(),
        location_id: $('#location').val(),
        emailId: emailId,
        fName: fName,
        lName: lName,
        phone: phone

    }

    console.log(formData)

    $.ajax({
        url: 'api/addEmployee.php',
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function (data) {
            Swal.fire({
                title: data.message,
                icon: 'success',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Ok",
                denyButtonText: ``
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("http://localhost/testday/employees.html");

                }
            });

        },
        error: function (status) {
            console.log('Request failed with status: ' + status);
        }
    });


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
       if(data.message == "Session  Time Expired"){
Swal.fire({

                    text: data.message,
                    icon: 'info',
                    confirmButtonText: 'Ok'
                })
}
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
