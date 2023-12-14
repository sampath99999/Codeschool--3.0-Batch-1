$.ajax({
  url: "./api/getRegisterdata.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    renderAdmin(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr.responseText); // Log the response text
  },
});

function renderAdmin(employees) {
  var tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";

  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];
    var row = document.createElement("tr");
    var employeeHTML = `
      <td class="table-secondary">${employee.name}</td>
      <td class="table-success">${employee.email}</td>
      <td class="table-danger">${employee.mobile}</td>
      <td><button class="assignTaskBtn">Assign Task</button></td>
    `;
    row.innerHTML = employeeHTML;
    tableBody.appendChild(row);

    // Add event listener for the "Assign Task" button
    var assignTaskBtn = row.querySelector(".assignTaskBtn");
    assignTaskBtn.addEventListener("click", function () {
      // Call a function to handle the task assignment for the specific employee
      assignTask(employee);
    });
  }
}

// Function to handle task assignment for a specific employee
function assignTask(_employee) {
  window.location.href = "TaskForm.html";
}
