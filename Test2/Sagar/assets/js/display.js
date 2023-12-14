$.ajax({
    url: "./api/display.php",
    success: function (data) {
        callposts(data);
        console.log(data);
    },
});

function callposts(response) {
    let data1 = "";
    for (let i = 0; i < response.length; i++) {
        let values = response[i];
        data1 += `<div class="card text-center m-3 col-3" style="width: 20rem;">
      <img src="${values.postimage}" class="card-img-top object-fit-contain mt-2 img-fluid" alt="postimage" style="max-height:300px;">
      <div class="card-body">
        <h5 class="card-title text-center">${values.posttitle}</h5>
        <p class="card-text" style="max-height:400px;">${values.postdescription}</p>
      </div>
    
      <div class="card-body">

      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
      Edit
    </button>

          <button type="button" class="btn btn-success " onclick="deletepost(${values.id})">  <a href="#" class="card-link text-decoration-none text-light">Delete</a></button>
                      
      
      </div>
    </div>`;
    }
    $("#cards").html(data1);
}