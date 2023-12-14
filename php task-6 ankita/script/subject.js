


function sidebar() {

    $('#sideBar').toggleClass('d-none d-block');
    $('#mainContent').toggleClass('col-12 col-10');


}


let subjectId;
subjectId = localStorage.getItem('subjectId');

subjectId = JSON.parse(subjectId);

console.log(subjectId);

let menuDetails = [];

formData = {
    subjectId: subjectId
}



$.ajax({
    url: '/week8/api/getMenu.php',
    method: 'POST',
    data: formData,
    dataType: 'json',
    success: function (data) {
        menuDetails = data.data
       
        showMenuDetails(data.data);
        


    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});





function showMenuDetails(menuDetails) {
    for (let i = 0; i < menuDetails.length; i++) {

        $('#sideBar').append(` 
 <div><a href="${menuDetails[i].slug}" onclick="setMenuId(${menuDetails[i].id})"> &nbsp;&nbsp;${menuDetails[i].name.toUpperCase()}</a></div>
`)
    };

}
function setMenuId(menuId) {
    localStorage.clear();
    localStorage.setItem("menuId", JSON.stringify(menuId));


    console.log(menuId, 678);
}

let menuId;
menuId = localStorage.getItem('menuId');

menuId = JSON.parse(menuId);
let containsDetails = [];

formData = {
    menuId: menuId

}
$.ajax({
    url: '/week8/api/getContain.php',
    method: 'POST',
    data: formData,
    dataType: 'json',
    success: function (data) {
        containsDetails = data.data
        showContainsDetails(data.data);

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});



function showContainsDetails(containsDetails) {

    $('#mainContent').empty();

    for (let i = 0; i < containsDetails.length; i++) {

        $('#mainContent').append(`
         <div class="mt-5 pt-5">

                    <h1>${containsDetails[i].title.toUpperCase()}</h1>


                    <div class="container-fluid bg-light shadow">

                        <div class=" mt-5">
                            <p class="h-50">${containsDetails[i].description}</p>
                        </div>
                    </div>
                </div>

        `)
    };

}


