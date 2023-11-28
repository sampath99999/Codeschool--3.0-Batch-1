if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}
  
$(document).ready(() => {
  getUserData();
  if ($('#searchText').val() == null || $('#searchText').val() == "") {
    getAllImages();
} else {
    getImagesByName();
}
  

  
  $('#searchButton').on('click', () => {
    if ($('#searchText').val() == null) {
      getAllImages();
    } else {
      location.reload();
      getImagesByName();
    }
  })

  $('#logoutButton').on('click', function () {
    localStorage.clear();
    window.location.href = './index.html';
  });

  $('#setImage').on('click', function () {
    const img_name = $('#imageName').val();
    const img_url = $('#imageUrl').val();
    console.log(img_name);
    console.log(img_url);
  
    $.ajax({
      url: "http://localhost/Codeschool/Task6/Imagely/server/api/setImage.php",
      method: "POST",
      data: {
        img_name,
        img_url
      },
      success: function (response) {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Image Uploaded Successful!',
          text: 'Thank you for your contribution.',
        });

        location.reload();
      },
      error: function (response) {
        console.log(response);
      }
    })
  })


})



function getUserData() {
  $.ajax({
    url: "http://localhost/Codeschool/Task6/Imagely/server/api/getUser.php",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
    },
    success: function (response) {
      console.log(response);
      const userData = JSON.parse(response);
      console.log(userData);

      $("#profileName").text(userData.data.user.user_name);


    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getAllImages() {
  $.ajax({
    url: 'http://localhost/Codeschool/Task6/Imagely/server/api/getAllImages.php',
    method: 'GET',
    success: function (imageDetails) {
      console.log(imageDetails);
      imageDetails.forEach(image => {
        const newDiv = document.createElement('div');
        newDiv.className = 'image-card d-flex flex-column';
        newDiv.innerHTML = `        
          <img src="${image.img_url}" alt="">
          <span>${image.img_name}</span>`;
        const body = document.getElementById("mainBody");
        body.appendChild(newDiv);
        
      });


    }
  })
}

function getImagesByName() {
  const img_name = $('#searchText').val();
  $.ajax({
    url: "http://localhost/Codeschool/Task6/Imagely/server/api/getImagesByName.php",
    method: "POST",
    data: { img_name },
    success: function (imageDetails) {
      console.log(imageDetails);
      imageDetails.forEach(image => {
        const newDiv = document.createElement('div');
        newDiv.className = 'image-card d-flex flex-column';
        newDiv.innerHTML = `        
          <img src="${image.img_url}" alt="">
          <span>${image.img_name}</span>`;
        const body = document.getElementById("mainBody");
        body.appendChild(newDiv);
      });
    }
  })
}


