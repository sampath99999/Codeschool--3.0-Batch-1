

    
    let pathArray = window.location.pathname.split('/');
    let slug = pathArray[pathArray.length - 1];
    


function sidebar() {

    $('#sideBar').toggleClass('d-none d-block');
    $('#mainContent').toggleClass('col-12 col-10');


}



let menuDetails = [];
let containDetails=[];

formData = {
 slug:slug
}



$.ajax({
    url: '/week8/api/getMenu.php',
    method: 'POST',
    data: formData,
    dataType: 'json',
    success: function (data) {
        menuDetails = data.data.menuDetails
       containDetails = data.data.Contain
        showMenuDetails(data.data.menuDetails);
        
       showContainsDetails(data.data.Contain);

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});

function showContainsDetails(containDetails){
 $('#mainContent').empty();

    for (let i = 0; i < containDetails.length; i++) {

        $('#mainContent').append(`
         <div class="mt-5 pt-5">

                    <h1>${containDetails[i].title.toUpperCase()}</h1>


                    <div class="container-fluid bg-light shadow">

                        <div class=" mt-5">
                            <p class="h-50  fs-5">${containDetails[i].description}</p>
                        </div>
                    </div>
                </div>

        `)
    };


}



function showMenuDetails(menuDetails) {
    for (let i = 0; i < menuDetails.length; i++) {

        $('#sideBar').append(` 
 <div><a  onclick="changeURL('${menuDetails[i].slug}'); changeContain(${menuDetails[i].id})" > &nbsp;&nbsp;${menuDetails[i].name.toUpperCase()}</a></div>
`)
    };
}


function changeURL(newURL) {
    history.pushState(null, null, newURL);
}

function changeContain(menuId){

formData = {
 menuId:menuId
}

let changeContainDetails=[];
$.ajax({
    url: '/week8/api/getContain.php',
    method: 'POST',
    data: formData,
    dataType: 'json',
    success: function (data) {
        
       changeContainDetails = data.data
       
        
       showChangeContainsDetails(data.data);

    },
    error: function (status) {
        console.log('Request failed with status: ' + status);
    }
});
function showChangeContainsDetails(changeContainDetails){
 $('#mainContent').empty();

    for (let i = 0; i < changeContainDetails.length; i++) {

        $('#mainContent').append(`
         <div class="mt-5 pt-5">

                    <h1>${changeContainDetails[i].title.toUpperCase()}</h1>


                    <div class="container-fluid bg-light shadow">

                        <div class=" mt-5">
                            <p class="h-50  fs-5">${changeContainDetails[i].description}</p>
                        </div>
                    </div>
                </div>

        `)
    };


}


}
