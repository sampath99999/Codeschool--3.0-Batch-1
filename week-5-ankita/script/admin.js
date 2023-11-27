
let subject_Info = {};
let subjectDetalis = [];
let Qustions = [];

let qustionCountForSubject = 0;
let userInfo;
let token;
userInfo = localStorage.getItem('user_info');
token = localStorage.getItem('token');
userInfo = JSON.parse(userInfo);
token = JSON.parse(token);
let subject_info = {};
console.log(userInfo, 123);
if(!userInfo && !token){
 alert("you are  not a loggedin ");
  window.location.replace("http://localhost/week7/logIn.html");
  

}


if(userInfo.user_types_id ==2){

   alert("you are  not a admin ");
  window.location.replace("http://localhost/week7/logIn.html");
  
}

let formData = {
    user_id: userInfo.id,
    token: token
}

$.ajax({
    url: 'api/vaildateAdmin.php',
    method: 'POST',
    dataType: 'json',
    data: formData,
    success: function (data) {
        alert(data.message, " ", "success");
        if (!data.status) {
            localStorage.clear();
            window.location.replace("http://localhost/week7/logIn.html");
        } else {


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
        subjectDetalis = data.data;
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
                        <div class="card-body text-white">
                            <h5 class="card-title mb-4 fs-5">${subjectDetalis[i].name}</h5>

                            <a class="btn btn-outline-light ms-md-2 me-md-5" data-bs-toggle="modal"
                                data-bs-target="#examNameModal" onclick= "addTest('${subjectDetalis[i].name}',${subjectDetalis[i].id})">Add Test</a>
                            <a class="btn btn-outline-light ms-5" data-bs-toggle="modal"
                                data-bs-target="#showTestModal" onclick="showTest('${subjectDetalis[i].name}',${subjectDetalis[i].id})" >Show Test</a>
                        </div>
                    </div>

                    <!---->
                    
                </div>

            </div>

        `)
    };
}


function addTest(subject_name, subject_id) {


    $('#NoOfQustions').val('');
    $('#ExamName').val('');
    subject_Info.name = subject_name;
    subject_Info.id = subject_id;
    $('#subjectName').text(subject_Info.name);
    console.log(subject_Info.id, 345, subject_Info.name);
    $('#addQustionModalToggleLabel').text(subject_Info.name);



}
function getTestDetails() {
    let qustionCount = $('#NoOfQustions').val();
    let examName = $('#ExamName').val();

    if (qustionCount == 0) {
        alert('Qustion number cannot be zero');
        return;
    }

    subject_Info.qustionCount = qustionCount;
    subject_Info.ExamName = examName;
    console.log(subject_Info);

    qustionCountForSubject = qustionCount;
    $('#addQuestionsButton').text('NEXT')
    Qustions = []
    $('#addQustionBtn').click();

}


function logout() {
    localStorage.removeItem('user_info');
    localStorage.removeItem('tokan');
    alert("logout successfully");
    window.location.replace('http://localhost/week7/logIn.html');



}



function addQuestions() {


    if (qustionCountForSubject == 0) {


        $.ajax({
            type: "POST",
            url: "api/addTest.php",
            data: subject_Info,
            dataType: "JSON",
            success: function (data) {

                if (data.status) {



                    alert(data.message, " ", "success");
                      
                     $('#modalClose').click();

                } else {
                    alert(data.message, " ", "error");
                }
            },
            error: function (err) {
                $("#error").text(err);
            }
        });

        return;
    }
    let option = [];
    let QustionsDetails = {};
    qustion_name = $('#qustions').val();


    if (!qustion_name) {
        alert("plz enter the qustions");

        return;
    }

    let Option_1 = {};
    let Option_2 = {};
    let Option_3 = {};
    let Option_4 = {};

    option1Name = $('#options1').val();
    option1Answer = $('#option1Radio').is(':checked');


    option2Name = $('#options2').val();
    option2Answer = $('#option2Radio').is(':checked');
    option3Name = $('#options3').val();
    option3Answer = $('#option3Radio').is(':checked');
    option4Name = $('#options4').val();
    option4Answer = $('#option4Radio').is(':checked');

    if (!option1Name) {
        alert("plz enter the option 1");

        return;
    }

    if (!option2Name) {
        alert("plz enter the option 2");

        return;
    }

    if (!option3Name) {
        alert("plz enter the option 3");

        return;
    }
    if (!option4Name) {
        alert("plz enter the option 4");

        return;
    }

    Option_1.optionName = option1Name;

    Option_1.is_Answer = option1Answer;

    Option_2.optionName = option2Name;
    Option_2.is_Answer = option2Answer;

    Option_3.optionName = option3Name;
    Option_3.is_Answer = option3Answer;

    Option_4.optionName = option4Name;
    Option_4.is_Answer = option4Answer;



    option.push(Option_1);
    option.push(Option_2);
    option.push(Option_3);
    option.push(Option_4);

    let answerArray = option.filter((data) => {

        if (data.is_Answer) { return true }

    })

    if (answerArray.length == 0) {

        alert('please select answer');
        return;
    }


    QustionsDetails.qustionName = qustion_name;
    QustionsDetails.option = option;
    Qustions.push(QustionsDetails);
    subject_Info.qustions = Qustions;

    qustionCountForSubject -= 1;

    $('#options1').val('');

    $('#options2').val('');
    $('#options3').val('');
    $('#options4').val('');
    $('#qustions').val('')
    $('input[name="AnswerCheckBox"]').prop('checked', false);
    if (qustionCountForSubject == (subject_Info.qustionCount - 1)) {
        $('#addQuestionsButton').text('')
        $('#addQuestionsButton').text('submit')
    }

    console.log(subject_Info)
}

let testList = [];
function showTest(subject_name, subject_id) {


    $('#showTestModalToggleLabel').text(subject_name);
    let formData = {
        subject_id: subject_id

    }



    $.ajax({
        url: 'api/showTest.php',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function (data) {
            testList = data.data
            showTestModal(data.data);

        },
        error: function (status) {
            console.log('Request failed with status: ' + status);
        }
    });



}
function showTestModal(testList) {

    $('#showTest').empty();

    for (let i = 0; i < testList.length; i++) {

        console.log(852)
        $('#showTest').append(`
       <tr>

                                    <td scope="row">${i + 1}</td>
                                    <td>${testList[i].exam_name}</td>
                                    <td> <button class="btn btn-primary text-white"  onclick="viewTest('${testList[i].exam_name}',${testList[i].id});"  data-bs-toggle="modal"
                            data-bs-target="#viewTestModal">View</button></td>
                                </tr>
        `)
    };
}


let qustionList = [];
function viewTest(exam_name, exam_id) {

    $('#viewTestModalToggleLabel').text(exam_name);
    let formData = {
        exam_id: exam_id


    }

    console.log()

    $.ajax({
        url: 'api/viewTest.php',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                qustionList = data.data;

                viewTestModal(data.data);
            } else {
                alert(data.message)
            }

        },
        error: function (status) {
            console.log('Request failed with status: ' + status);
        }
    });

}

function viewTestModal(qustionList) {
    console.log(qustionList, 23);
    $('#viewTest').empty();

    for (let i = 0; i < qustionList.length; i++) {
        let question = qustionList[i].question_name;
        let optionList = qustionList[i].options;

    
        $('#viewTest').append(`
            <div class="mb-3">
                <div class="d-flex"><span>Q${i + 1}.</span>
                    <div class="text-white">${question}</div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Serial No.</th>
                        <th scope="col">Options</th>
                        <th scope="col">isAnswer</th>
                    </tr>
                </thead>
                <tbody id="viewOption${i}"></tbody>
            </table>
        `);

        for (let j = 0; j < optionList.length; j++) {
            $(`#viewOption${i}`).append(`
                <tr>
                    <td scope="row">${j + 1}</td>
                    <td>${optionList[j].option_name}</td>
                    <td>${optionList[j].is_answer}</td>
                </tr>
            `);
        }
    }
}




