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
        $("#profileName").text(response.data.user.name);
    },
    error: function (response) {
        let data = JSON.parse(response.responseText);
        localStorage.removeItem("token");
        location.href = "./login.html?error=" + data.message;
    },
});

function RenderData(){
    $.ajax({
        url: "./api/etSalaryDetails.php",
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
RenderData();
function DisplayData(users){
    let t='';
    users.forEach((user)=>{
        
        return(
            t+=`
            <tr>
            <th class="py-3 text-center" scope="row">${user.id}</th>
                <td class="py-3 text-center">${user.fullname} </td>
                <td class="py-3 text-center">${user.salary_month}</td>
                <td class="py-3 text-center">${user.salary_year}</td>
                <td class="py-3 text-center">${user.paid_on}</td>
                <td class="py-3 text-center">${user.gross}</td>
                <td class="py-3 text-center">${user.deduction}</td>
                <td class="py-3 text-center">${user.net}</td>
                <td class="py-3 text-center">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModall" id="${user.id}" onclick="getSingleSalaryComponent(this)">
                View
              </button>
                </td>
            </tr>
           `
         );
    })
    $('#salaryTable').html(t);
  } 
function sidebar() {
    $(".sideBar").toggleClass("show-sidebar");
}
function logout() {
    localStorage.clear();
}
// function view(){
//     $.ajax({
//         url: "./api/getSalaries.php",
//         method: "POST",
//         success: function (response) {
//             response = JSON.parse(response);
//             viewData(response.data.user)
//             console.log(response.data);
//         },
//         error: function (response) {
//             let data = JSON.parse(response.responseText);
//             // localStorage.removeItem("token");
//             // location.href = "./login.html?error=" + data.message;
//         },
//     });
// }
// view()
// function viewData(){
//     let $x='';
//     details.forEach((user)=>{
//         return (x+=``
//         );
//     })
//     $(".modal-body").html(x);
// }
function getSingleSalaryComponent(ele){
    id=$(ele).attr("id");
    console.log(id);

    $.ajax({
        url: "./api/getSalaries.php",
        method: "POST",
        data: {
            id,
        },
        success: (response) => {
            response = JSON.parse(response);
            $("#viewName").text(response.data.details.fullname);
            $("#viewLocation").text(response.data.details.district);
            $("#viewNet").text(response.data.details.net);
            $("#viewStatus").text(response.data.details.work_description);
            $("#viewPosition").text(response.data.details.designation_description);
          
            let t='',d='';
            for(let i=0;i<response.data.salaries.length;i++){
                if(i<6){
                    t+=`
                    <tr>
                      <td>${response.data.salaries[i].salary_description}</td>
                      <td class="text-center">${response.data.salaries[i].amount}</td>
                    </tr> `
                }
                else{
                    d+=`
                    <tr>
                    <td>${response.data.salaries[i].salary_description}</td>
                    <td class="text-center">${response.data.salaries[i].amount}</td>
                    </tr> `
                }
            }
             t+=`
             <tr>
               <td class="fw-bold">Total</td>
               <td class="fw-bold text-center ">${response.data.details.gross}</td>
             </tr> `
             d+=`
             <tr>
               <td class="fw-bold">Total</td>
               <td class="fw-bold text-center ">${response.data.details.deduction}</td>
             </tr> `
    $("#viewEarings").html(t);
    $("#viewDeduction").html(d);

        },
        error: (response) => {
            console.log(response);
        },
    });
    
}