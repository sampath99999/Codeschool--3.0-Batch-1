console.log("abcd");

function validateName() {
  var fullName = $("#fullname").val();
  var regex = /^[a-zA-Z\s]+$/;
  var validationMessage = $("#validationMessage");
  if (!regex.test(fullName)) {
    validationMessage.html("Invalid characters in the name.");
    validationMessage.css("color", "red");
    return false;
  } else {
    validationMessage.html("");
    return true;
  }
}

$("#fullname").on("input", validateName);

function validateMail() {
  var mail = $("#email").val(); // Corrected ID
  var regex = /^\S+@\S+\.\S+$/;
  var validationMessage2 = $("#validationMessage2");
  if (!regex.test(mail)) {
    validationMessage2.html("Invalid email format.");
    validationMessage2.css("color", "red");
    return false;
  } else {
    validationMessage2.html("");
    return true;
  }
}
function validatePhone() {
  var phoneNo = $("#phoneNo").val();
  var regex = /^\d{10}$/;
  var validationMessage3 = $("#validationMessage3");
  if (!regex.test(phoneNo)) {
    validationMessage3.html("Invalid phone number.");
    validationMessage3.css("color", "red");
    return false;
  } else {
    validationMessage3.html("");
    return true;
  }
}

function validatePwd() {
  var password = $("#password").val();
  var validationMessage4 = $("#validationMessage4");
  if (password.length < 8) {
    validationMessage4.html("Password must be at least 8 characters.");
    validationMessage4.css("color", "red");
    return false;
  } else {
    validationMessage4.html("");
    return true;
  }
}
function next(){
  const currentPage = window.location.pathname;

  if (currentPage == "/templates/registeration-Page-1.html") {
    const fullName = $("#fullname").val();
    const email = $("#email").val();
    const phone = $("#phoneNo").val();
    const password = $("#password").val();
window.location.href = "/templates/registeration-Page-2.html"
}
function submitForm() {
  const currentPage = window.location.pathname;

  if (currentPage === "/templates/registeration-Page-1.html") {
    const fullName = $("#fullname").val();
    const email = $("#email").val();
    const phone = $("#phoneNo").val();
    const password = $("#password").val();

    window.location.href = "/templates/registeration-Page-2.html";
  } else if (currentPage === "/templates/registeration-Page-2.html") {
    const selectedAmount = $('input[name="amount"]:checked').val();
    const dedicationText = $("#dedicationText").val();
    const writeComment = $("#flexCheckDefault").prop("checked");

    window.location.href = "/templates/registeration-Page-3.html";
  } else if (currentPage === "/templates/registeration-Page-3.html") {
    const cardNumber = $("#cardNumber").val();
    const expirationDate = $("#expirationDate").val();
    const cvv = $("#cvv").val();
    const ifscCode = $("#ifscCode").val();

    try {
      $.post("http://localhost:3000/api/admin/login.php", {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        selectedAmount: selectedAmount,
        dedicationText: dedicationText,
        writeComment: writeComment,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
        ifscCode: ifscCode,
      }).then(function (res) {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    window.location.href = "/templates/registeration-Page-3.html";
  }
}}
