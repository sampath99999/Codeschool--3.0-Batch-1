if (!localStorage.getItem("token")) {
  window.location.href = "fundlogin.html";
}

$.ajax({
  url: "./api/validation.php",
  method: "POST",
  data: {
    token: localStorage.getItem("token"),
  },
  success: function (response) {
    response = JSON.parse(response);
    $("#name").text(response.data.user.name);
  },
  error: function (response) {
    let data = JSON.parse(response.responseText);
    localStorage.removeItem("token");
    location.href = "login.html?error=" + data.message;
  },
});

function logout() {
  localStorage.clear();
  location.href = "login.html";
}

function task() {
  window.location.href = "admin.html";
}

$.ajax({
  url: "./api/getTaskdetails.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    renderTask(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr.responseText); // Log the response text
  },
});

$.ajax({
  url: "./api/taskform.php",
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log("Data received from AJAX:", data);
    renderTask(data);
  },
  error: function (xhr, status, error) {
    console.error("Error fetching data:", error);
    console.log("XHR:", xhr.responseText); // Log the response text
  },
});

// Define a counter variable
function renderTask(tasks1) {
  var tableBody = document.getElementById("display");
  tableBody.innerHTML = "";

  if (tasks1.length === 0) {
    var row = document.createElement("tr");
    var taskHTML = `
      <td class="table-success">NA</td>
      <td class="table-danger">NA</td>
    `;

    row.innerHTML = taskHTML;
    tableBody.appendChild(row);
  } else {
    for (var i = 0; i < tasks1.length; i++) {
      var task = tasks1[i];
      var row = document.createElement("tr");
      var taskHTML = `
        <td class="table-success">${task.task_name}</td>
        <td class="table-danger">${task.task_desc}</td>
        <td class="complete-row">
          <button class="complete-btn" onclick="complete(this)">Complete</button>
        </td>
        <td class="inprogress">
          <button class="inprogress-btn" onclick="inprogress(this)">Inprogress</button>
        </td>
        <td class="incomplete">
          <button class="incomplete-btn" onclick="incomplete(this)">Incomplete</button>
        </td>
      `;

      row.innerHTML = taskHTML;
      tableBody.appendChild(row);
    }
  }
}

var completedCounter = 0;
var inprogressCounter = 0;
var incompleteCounter = 0;

// function updateCountersAndHideButtons(button, counterElement, counter) {
//   // Hide other buttons using jQuery
//   var row = $(button).closest("tr");
//   var completeButton = row.find(".complete-btn");
//   var inprogressButton = row.find(".inprogress-btn");
//   var incompleteButton = row.find(".incomplete-btn");

//   // Check if the button is not disabled
//   if (!$(button).prop("disabled")) {
//     completeButton.hide();
//     inprogressButton.hide();
//     incompleteButton.hide();

//     // Update the counter value
//     counter++;
//     counterElement.text(counter);

//     // Disable the button
//     $(button).prop("disabled", true);
//   }
// }

// function complete(button) {
//   var counterElement = $(".completedtask");
//   updateCountersAndHideButtons(button, counterElement, completedCounter);
//   counter++;
// }

// function inprogress(button) {
//   var counterElement = $(".inprogresstask");
//   updateCountersAndHideButtons(button, counterElement, inprogressCounter);
// }

// function incomplete(button) {
//   var counterElement = $(".incompletetask");
//   updateCountersAndHideButtons(button, counterElement, incompleteCounter);
// }
var completedCounter = 0;
var inprogressCounter = 0;
var incompleteCounter = 0;

function updateCountersAndHideButtons(button, counterElement, counter) {
  // Hide other buttons using jQuery
  var row = $(button).closest("tr");
  var completeButton = row.find(".complete-btn");
  var inprogressButton = row.find(".inprogress-btn");
  var incompleteButton = row.find(".incomplete-btn");

  // Check if the button is not disabled
  if (!$(button).prop("disabled")) {
    completeButton.hide();
    inprogressButton.hide();
    incompleteButton.hide();

    // Update the counter value
    counter++;
    counterElement.text(counter);

    // Disable the button
    $(button).prop("disabled", true);
  }
}

function complete(button) {
  var counterElement = $(".completedtask");
  updateCountersAndHideButtons(button, counterElement, completedCounter);
}

function inprogress(button) {
  var counterElement = $(".inprogresstask");
  updateCountersAndHideButtons(button, counterElement, inprogressCounter);
}

function incomplete(button) {
  var counterElement = $(".incompletetask");
  updateCountersAndHideButtons(button, counterElement, incompleteCounter);
}
