// if (!localStorage.getItem("token")) {
//   location.href = "./admin.html";
// }
var wrapper_ele = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
  wrapper_ele.classList.toggle("toggled");
};

$(document).ready(function () {
  function getdata() {
    $.ajax({
      url: "./assets/text/movielist.json",
      method: "get",
      dataType: "json",
      success: function (data) {
        adddata(data);
      },
      error: function (error) {
        console.log("error");
      },
    });
  }
  function adddata(data) {
    // let card = $(".row");
    let output = " ";
    for (let item of data) {
      output += `
        <div class="col col-sm-6 col-lg-3">
                <div
                  class="card  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
                >
                  <img
                    src="${item.image}"
                    alt="movie-img"
                    class="img-fluid"
                  />
                  <div class="card-body">
                    <h5 class="card-title m-0">${item.movie}</h5>
                    <p class="card-text m-0">${item.rating}</p>
  
                    <a href="booknow.html" class="btn btn-primary m-0">Book Ticket</a>
                  </div>
                </div>
              </div>
        `;
    }
    document.querySelector(".row").innerHTML = output;
    // card.innerHTML = output;
  }
  getdata();
});
