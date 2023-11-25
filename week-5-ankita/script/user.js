





let subject_Info={};

let userInfo;
let token;
userInfo = localStorage.getItem('user_info');
token = localStorage.getItem('token');
userInfo = JSON.parse(userInfo);
token = JSON.parse(token);


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
            window.location.replace("http://localhost/week7/login.html");
        }

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});













$.ajax({
    url: 'api/getSubjects.php',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        subjectDetalis=data.data;
        showSubjects(data.data);
    
    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});


function showSubjects(subjectDetalis) {

    $('#subject').empty();

    for (let i = 0; i < subjectDetalis.length; i++) {

        $('#subject').append(`
        <div class="   col-sm-10 col-md-4 mt-5 ms-5 ms-md-0">

                <div class="ms-3 p-2">
                    <div class=" card shadow-1-strong w-75" style="background:rgba(0, 0, 0, 0.5);">
                        <div class="p-4">
                            <img src="${subjectDetalis[i].image}" class="card-img-top" alt="Fissure in Sandstone" height="150px" />
                        </div>
                        <div class="card-body text-white text-center">
                            <h5 class="card-title mb-4 fs-5">${subjectDetalis[i].name}</h5>

                            
                            <a class="btn btn-outline-light m-auto" data-bs-toggle="modal"
                                data-bs-target="#exampleModalToggle1001" onclick= "showTest('${subjectDetalis[i].name}',${subjectDetalis[i].id})">Show Test</a>
                        </div>
                    </div>

                    <!---->
                   
                 <!---->
                </div>


        `)
    };
}


function showTest(subject_name,subject_id){
console.log(67);
  subject_Info.name=subject_name;
  subject_Info.id=subject_id;
$('#subjectName').text(subject_Info.name);
console.log(subject_Info.id,345,subject_Info.name);



}


function logout(){
    localStorage.removeItem('user_info');
    localStorage.removeItem('tokan');
    alert("logout successfully");
    window.location.replace('http://localhost/week7/logIn.html');
   


}






