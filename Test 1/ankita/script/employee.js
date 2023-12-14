let empDetail = [];
let working_status = [];
let locations = [];
let working_postions = [];
let userInfo;
userInfo = localStorage.getItem('user_info');
userInfo = JSON.parse(userInfo);

let token;
userInfo = localStorage.getItem('token');
token = JSON.parse(token);
function sidebar(){

document.getElementById('sideBar').classList.toggle('d-none');
document.getElementById('mainContent').classList.toggle('col-12');


}

// if (userInfo) {

//     $('#logInButton').empty();

//     $('#registerButton').empty();







// }


// else {

    
//     $('#logOutButton').empty();

// }


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
       <tr>

                                    <td>
                                    ${empDetail[i].empcode}
                                    </td>
                                    <td> ${empDetail[i].name}</td>
                                    
                                    <td> ${empDetail[i].phone}</td>
                                        <td> ${empDetail[i].email}</td>
                                    <td> ${empDetail[i].working_status}</td>
                                    <td> ${empDetail[i].location}</td>
                                    <td> ${empDetail[i].working_postions}</td>

                                    

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
        <option value="${working_status[i].id}">${working_status[i].description}</option>
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
        <option value="${locations[i].id}">${locations[i].description}</option>
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
        <option value="${working_postions[i].id}">${working_postions[i].description}</option>
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
        alert("plz  select the  working position");
        $("#working_postionError").text("plz  select the  working position");
        return;
    }

    if (working_status_id == " ") {
        alert("plz  select the wroking status");
        $("#working_statusError").text("plz  select the wroking status");
        return;
    }
    if (location_id == " ") {
        alert("plz  select the location");
        $("#locationError").text("plz  select the location");
        return;
    }


    if (!fName) {
        alert("plz enter the  first name");
        $("#fNameError").text("plz enter the  first name");
        return;
    }
    if (spcialPattern.test(fName)) {
        alert("plz enter the  sfirst name without special symbol");
        $("#fNameError").text("plz enter the  first name without special symbol");
        return;
    }

    if (fName.length > 12) {
        alert("plz enter the  first name lessthan 12 character");
        $("#fNameError").text("plz enter the  first name lessthan 12 character");
        return;
    }
    if (!lName) {
        alert("plz enter the  last name");
        $("#lnameError").text("plz enter the  last name");
        return;
    }
    if (spcialPattern.test(lName)) {
        alert("plz enter the  last name without special symbol");
        $("#lnameError").text("plz enter the  last name without special symbol");
        return;
    }

    if (lName.length > 12) {
        alert("plz enter the  last name lessthan 12 character");
        $("#lnameError").text("plz enter the  last name  lessthan 12 character");
        return;
    }



    if (!phone) {
        alert("plz enter the  phone number");
        $("#phoneError").text("plz enter the  phone number");
        return;
    }
    if (phone.length != 10) {
        alert("plz enter the 10 digit phone number  ");
        $("#phoneError").text("plz enter the 10 digit phone number ");
        return;
    }
    if (isNaN(phone)) {
        alert("enter only numbers");
        $("#phoneError").text("enter only numbers");
        return;
    }

    if (!emailId) {
        alert("plz enter the valid email");
        $("#emailError").text("plz enter the valid email");
        return;
    }
    const pattern = /[@.@@ ]/;
    if (!pattern.test(emailId)) {
        alert("plz enter the valid email with @.com ");
        $("#emailError").text("plz enter the valid email with @");
        return;
    }

    let formData = {
        working_postions_id: $('#working_postion').val(),
        working_status_id: $('#working_status').val(),
        location_id: $('#location').val(),
        emailId: emailId,
        fName: fName, lName: lName, phone: phone

    }

    console.log(formData)

    $.ajax({
        url: 'api/addEmployee.php',
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function (data) {


            alert(data.message, " ", "success");
            window.location.replace("http://localhost/testday/employees.html");
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
    url: 'api/vaildateUser.php',
    method: 'POST',
    dataType: 'json',
    data: formData,
    success: function (data) {
        alert(data.message, " ", "success");
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
