function sidebar() {
    $(".sideBar").toggleClass("show-sidebar");
}
function logout() {
    localStorage.clear();
}
if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}
function GetData(){
    $.ajax({
        url: "./api/getEmployeeDetails.php",
        method: "GET",
        success: function (response) {
            response = JSON.parse(response);
            DisplayData(response.data.user)
            console.log(response.data);
        },
        error: function (response) {
            let data = JSON.parse(response.responseText);
            localStorage.removeItem("token");
            location.href = "./login.html?error=" + data.message;
        },
    });
}

GetData();

$.ajax({
    url: "./api/getUser.php",
    method: "POST",
    data: {
        token: localStorage.getItem("token"),
    },
    success: function (response) {
        response = JSON.parse(response);
        console.log(response);
        $("#profileName").text(response.data.user.name);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./login.html?error=" + data.message;
    },
});

function DisplayData(users){
    let t='';
    users.forEach((user)=>{
        
        return(
            t+=`
            <tr >
            <th class="py-3 text-center" scope="row">${user.id}</th>
                <td class="py-3 text-center">${user.fullname} </td>
                <td class="py-3 text-center">${user.date_of_joining}</td>
                <td class="py-3 text-center">${user.date_of_birth}</td>
                <td class="py-3 text-center">${user.gender}</td>
                <td class="py-3 text-center">${user.work_description}</td>
                <td class="py-3 text-center">${user.designation_description}</td>
                <td class="py-3 text-center">${user.district}</td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUpdateEmployee" id="${user.id}" onclick="getSingleEmployee(this)">
                Update
                </button>
                </td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" id="${user.id}"   onclick="deleteEmployee(this)">
                  delete
                </button>
              </td>
            </tr>
           `
         );
    })
    $('tbody').html(t);
  } 


function addEmployee(){
    let first_name=$("#firstName").val();
    let last_name=$("#lastName").val();
    let date_of_joining=$("#dateOfJoining").val()
    let date_of_birth=$("#dateOfBirth").val()
    let gender=$("#Gender").val()
    let phone_no=0;
    let working_status_id=$("#Working_status_id").val()
    let designation_id=$("#Designation").val()
    let location_id=$("#EmployeeLocation").val()
    let gross=$("#gross").val()
    console.log(first_name,last_name,date_of_birth,date_of_joining,gender,phone_no,working_status_id,designation_id,location_id,gross);
    $.ajax({
        url: "./api/AddEmployee.php",
        method: "POST",
        data: {
            first_name,
            last_name,
            date_of_joining,
            date_of_birth,
            gender,
            phone_no,
            working_status_id,
            designation_id,
            location_id,
            gross
        },
        success: function (response) {
            console.log(response);
            location.reload();
        },
        error: function (response) {
            let data = JSON.parse(response.responseText);
            localStorage.removeItem("token");
            location.href = "./login.html?error=" + data.message;
        },
    });
    window.location.reload();
    
}
var id=0;
function deleteEmployee(ele){
    id=$(ele).attr("id");
    console.log(id);
    
}
function sureDelete(){
        
    $.ajax({
        url: "./api/deleteEmployee.php",
        method: "POST",
        data: {
            id,  
        },
        success: (response) => {
            response = JSON.parse(response);
            console.log(response);
            
        },
        error: (response) => {
            console.log(response);
        },
    });
    window.location.reload();
}

function getSingleEmployee(ele){
    id=$(ele).attr("id");
    console.log(id);

    $.ajax({
        url: "./api/getOneEmployee.php",
        method: "POST",
        data: {
            id,
        },
        success: (response) => {
            response = JSON.parse(response);
            $("#updatefirstName").val(response.data.employee.first_name);
            $("#updatelastName").val(response.data.employee.last_name);
            $("#updatedateOfJoining").val(response.data.employee.date_of_joining);
            $("#updatedateOfBirth").val(response.data.employee.date_of_birth);
            $("#updateGender").val(response.data.employee.gender);
            $("#updateWorking_status_id").val(response.data.employee.working_status_id);
            $("#updateDesignation").val(response.data.employee.designation_id);
            $("#updatelocation").val(response.data.employee.location_id);
            $("#updategross").val(response.data.employee.gross);
            
        },
        error: (response) => {
            console.log(response);
        },
    });
    
}

function updateEmployee(){
    let first_name=$("#updatefirstName").val();
    let last_name=$("#updatelastName").val();
    let date_of_joining=$("#updatedateOfJoining").val();
    let date_of_birth=$("#updatedateOfBirth").val();
    let gender=$("#updateGender").val();
    let phone_no=0;
    let working_status_id=$("#updateWorking_status_id").val();
    let designation_id=$("#updateDesignation").val();
    let location_id=$("#updatelocation").val();
    let gross=$("#updategross").val();

    $.ajax({
        url: "./api/updateEmployee.php",
        method: "POST",
        data: {
            id,
            first_name,
            last_name,
            date_of_joining,
            date_of_birth,
            gender,
            phone_no,
            working_status_id,
            designation_id,
            location_id,
            gross
        },
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            let data = JSON.parse(response.responseText);
            localStorage.removeItem("token");
            location.href = "./login.html?error=" + data.message;
        },
    });
    window.location.reload();
}