function deletepost(id) {

    var conf = confirm("Are You Sure to Delete?");
    if(conf==true){
      $.ajax({
        url: "./api/deleteposts.php",
        method: "POST",
        data: {
          id,
        },
        success: (response) => {
          response = JSON.parse(response);
          console.log(response);
        },
        error: (response) => {
          console.log(response);
        },
      });
      window.location.reload();
    }
    }