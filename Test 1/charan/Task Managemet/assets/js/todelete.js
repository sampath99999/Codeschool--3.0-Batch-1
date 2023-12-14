        


$.ajax({
  url: "./api/taskform.php",
  method: "POST",
  data: {
    taskname,
    taskdescription,
  },
  success: (response) => {
    response = JSON.parse(response);
    if (!response.status) {
      alert(response.message);
      return false;
    }
    location.href = "dashboard.html";
  },
  error: (response) => {
    console.log(response);
  },
});
