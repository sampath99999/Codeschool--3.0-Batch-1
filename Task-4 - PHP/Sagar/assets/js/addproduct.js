// function addproduct() {
//     let productname = $("#productname").val();
//     let productimage = $("#productimage").val();
//     let price = $("#price").val();

//     $.ajax({
//         url: "./api/addproduct.php",
//         method: "POST",
//         data: {
//             productname,
//             productimage,
//             price,
//         },
//         success: (response) => {
//             response = JSON.parse(response);
//             if (!response.status) {
//                 alert(response.message);
//                 return false;
//             }
//             location.href='./dashboard.html';
//         },
//         error: (response) => {
//             console.log(response);
//         },
//     });
// }

async function addproduct(){
    const form = document.getElementById('myform');
    const formData = new FormData(form);
  
    try {
      const response = await fetch('./api/addproduct.php', {
        method: 'POST',
        body: formData,
      });
    
      const result = await response.json();

  
      if (result.success) {
        console.log('Form submitted successfully:', result.data);
         location.href="./dashboard.html";
       
      } else {
        console.error('Form submission failed:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }