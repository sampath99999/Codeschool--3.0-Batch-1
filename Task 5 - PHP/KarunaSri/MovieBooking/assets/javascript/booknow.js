let full_time = new Date();
let hours = full_time.getHours();
let minutes = full_time.getMinutes();
let seconds = full_time.getSeconds();
let fullTime = hours + ":" + minutes + ":" + seconds;

$("#time").text(fullTime);

$(document).ready(function () {
  var movie = "";
  function selectmovie() {
    $.ajax({
      url: "http://localhost/MOVIEBOOKING/api/booknow.php",
      method: "POST",
      data: {},
      success: (response) => {
        response = JSON.parse(response);
        mov = response;
        // alert("At THe db");

        mov.forEach((element) => {
          //  console.log(element.title);
          movie += `<option value="${element.title}"> ${element.title}</option>`;
        });
        $("#selectmovie").html(movie);
      },
      error: (response) => {
        console.log(response);
      },
      // location.href = "./shows.html";
    });
  }
  selectmovie();
  function fetch() {
    $.ajax({
      url: "http://localhost/MOVIEBOOKING/api/fetch.php",
      method: "POST",
      data: {},
      success: (response) => {
        response = JSON.parse(response);
        data = response;
        alert("At THe db");
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  fetch();
});

// $(document).ready(function () {
//   // Example data
//   var imageData = "path/to/your/image.jpg";
//   var headingData = "Sample Heading";
//   var paragraphsData = [
//     "This is the first paragraph.",
//     "This is the second paragraph.",
//   ];

// Call the function to display content
//   displayContent(imageData, headingData, paragraphsData);

//   function displayContent(imagePath, heading, paragraphs) {
//     // Display content in the #content-container
//     $("#content-container").html(`
//             <h1>${heading}</h1>
//             <img src="${imagePath}" alt="Image">
//         `);

//     // Append paragraphs
//     paragraphs.forEach(function (paragraph) {
//       $("#content-container").append(`<p>${paragraph}</p>`);
//     });
//   }
// });
