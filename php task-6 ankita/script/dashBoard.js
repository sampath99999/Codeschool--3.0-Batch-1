


let subjectDetails = [];

$.ajax({
    url: 'api/getSubject.php',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        subjectDetails = data.data;
        showSubjects(data.data);

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});


function showSubjects(subjectDetails) {

    $('#subject').empty();

    for (let i = 0; i < subjectDetails.length; i++) {

        $('#subject').append(`
        <div class="col-sm-10 col-md-4 mt-5 ms-5 ms-md-0">

                <div class="ms-3 p-2">
                    <div class=" card shadow-lg w-75 bg-white ">
                        <div class="p-4">
                            <img src="${subjectDetails[i].image}" class="card-img-top" alt="Fissure in Sandstone" height="150px" />
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title mb-4 fs-5">${subjectDetails[i].name.toUpperCase()}</h5>


                            <a  href="${subjectDetails[i].slug}" class="btn btn-outline-white btn-primary " onclick = "setSubjectId(${subjectDetails[i].id})"> Start Learning</a>
                        </div>
                    </div>
                </div>
            </div>

        `)
    };
console.log(subjectDetails,567);

      
}


function setSubjectId(subjectId){

localStorage.clear();
 localStorage.setItem("subjectId",JSON.stringify(subjectId));
console.log(subjectId,678);
}