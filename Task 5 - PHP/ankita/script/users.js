




let subject_Info = {};

let userInfo;
let token;
userInfo = localStorage.getItem('user_info');
token = localStorage.getItem('token');
userInfo = JSON.parse(userInfo);
token = JSON.parse(token);

if(!userInfo && !token){
 alert("you are  not a loggedin ");
  window.location.replace("http://localhost/week7/logIn.html");
  

}

if(userInfo.user_types_id ==1){

   alert("you are  not a user ");
  window.location.replace("http://localhost/week7/logIn.html");
  
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
            window.location.replace("http://localhost/week7/logIn.html");
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
                        <div class="card-body text-white text-center">
                            <h5 class="card-title mb-4 fs-5">${subjectDetalis[i].name}</h5>

            
                            <a class="btn btn-outline-light " data-bs-toggle="modal"
                                data-bs-target="#showTestModal" onclick="showTest('${subjectDetalis[i].name}',${subjectDetalis[i].id})" >Show Test</a>
                        </div>
                    </div>

                    <!---->
                    
                </div>

            </div>

        `)
    };
}

function showTest(subject_name, subject_id) {
    console.log(67);
    subject_Info.name = subject_name;
    subject_Info.id = subject_id;
    $('#subjectName').text(subject_Info.name);
    console.log(subject_Info.id, 345, subject_Info.name);


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
                                    <td> <button class="btn btn-primary text-white"  onclick="attemptTest('${testList[i].exam_name}',${testList[i].id});"  data-bs-toggle="modal"
                            data-bs-target="#attemptTestModal">View</button></td>
                                </tr>
        `)
    };
}

let qustionList = [];
function attemptTest(exam_name, exam_id) {

    $('#attemptTestModalToggleLabel').text(exam_name);
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

                attemptTestModal(data.data);
            } else {
                alert(data.message)
            }

        },
        error: function (status) {
            console.log('Request failed with status: ' + status);
        }
    });

}

function attemptTestModal(qustionList) {
    console.log(qustionList, 23);
    $('#attemptTest').empty();

    for (let i = 0; i < qustionList.length; i++) {
        let question = qustionList[i].question_name;
        let optionList = qustionList[i].options;


        $('#attemptTest').append(`
            <div class="mb-3">
                <div class="d-flex"><span>Q${i + 1}.</span>
                    <div class="text-white">${question}</div>
                </div>
            </div>

            <table class="table  table-hover   table-bordered ">
                <thead>
                    <tr class="text-center">
                               <th scope="col">Options</th>
                            <th scope="col">chooseAnswer</th>
                      
                      
                    </tr>
                </thead>
                <tbody id="attemptOption${i}"></tbody>
            </table>
        `);

        for (let j = 0; j < optionList.length; j++) {
            $(`#attemptOption${i}`).append(`
                <tr class="text-center">
                     <td>${optionList[j].option_name}</td>
                     <td><input class="form-check-input" type="radio" onclick="recordAnswer(${qustionList[i].question_id},${optionList[j].option_id})"
                         name="AnswerCheckBox${i}"></td>
                   
                   
                </tr>
            `);

        }

        $('#attemptTest').append(`
<div id="rightAnswer${i}" class="text-success fw-bold"></div>
`);

    }
}









function logout() {
    localStorage.removeItem('user_info');
    localStorage.removeItem('tokan');
    alert("logout successfully");
    window.location.replace('http://localhost/week7/logIn.html');


}

let answer = {}
let rightAnswer = [];
function recordAnswer(questionId, optionId) {
    if (answer.hasOwnProperty(questionId)) {
        delete answer[questionId];
    }
    answer[questionId] = { question_id: questionId, option_id: optionId };

    console.log(answer)
}

function submitAnswer() {

    let totalAnswer = Object.keys(answer).length;

    if (totalAnswer != qustionList.length) {

        alert("Please answer all the questions!");
        return;
    }

    let score = 0;

    for (let key in answer) {
        for (let i in qustionList) {
            if (qustionList[i].question_id == key) {
                for (let k in qustionList[i].options) {
                    if (qustionList[i].options[k].option_id == answer[key].option_id && qustionList[i].options[k].is_answer) {
                        score += 1;
                    }

                    if (qustionList[i].options[k].is_answer) {
                        rightAnswer.push({ option: qustionList[i].options[k].option_name })

                    }
                }
            }
        }
    }

 alert("your score is " + score + " out of " + qustionList.length);
 $("#attemptTest input").prop("disabled", true);
showAnswer();
$('#resultModal').empty();
$('#resultModal').append(` <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
`);


}


function showAnswer(){

for (let i in rightAnswer){

$(`#rightAnswer${i}`).text("ANSWER.  "+ rightAnswer[i].option);
}
}