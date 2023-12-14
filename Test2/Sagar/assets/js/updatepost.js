function updatepost() {
  
    let id = $("#id").val();
    let postimage = $("#postimage").val();
    let posttitle = $("#posttitle").val();
    let postdescription = $("#postdescription").val();
   
    
  
   console.log(id, postimage, posttitle, postdescription);
    $.ajax({
      url: "./api/updatepost.php",
      method: "POST",
      data: {
        id,
        postimage,
        posttitle,
        postdescription,
        
      },
      success: (response) => {
        response = JSON.parse(response);
        if (!response.status) {
          alert(response.message);
          return false;
        }
        location.href = "./dashboard.html";
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  