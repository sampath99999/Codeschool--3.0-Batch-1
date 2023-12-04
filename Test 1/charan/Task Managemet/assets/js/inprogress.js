$.ajax({
  url: "./api/completebutton.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    renderCompletedTasks(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr);
  },
});
function renderCompletedTasks(completetasks) {
  var tableBody = document.getElementById("completedtaskbody");
  tableBody.innerHTML = "";

  for (var i = 0; i < completetasks.length; i++) {
    var completetask = completetasks[i];
    var row = document.createElement("tr");
    var employeeHTML = `
      <td class="table-secondary">${completetask.task_name}</td>
      <td class="table-success">${completetask.task_desc}</td>
      <td class="table-danger">${completetask.status}</td>
      <td><button class="delete"> Delete</button></td>
    `;
    row.innerHTML = employeeHTML;
    tableBody.appendChild(row);
  }
}

let completed = document.getElementById("completedTask");
completed.addEventListener("click", completedTask);

function completedTask() {
  window.href.location = "dashboard.html";
}
