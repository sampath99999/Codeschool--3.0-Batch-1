$("#submit-button").on("click", function (event) {
  if (
    !validateName() ||
    !validateMail() ||
    !validatePhone() ||
    !validatePwd()
  ) {
    event.preventDefault();
  }
});

function validateName() {
  var fullName = $("#full-name").val();
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

function validateMail() {
  var mail = $("#mail").val();
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

$("#nextButton").on("click", function (event) {
  if (
    !validateName() ||
    !validateMail() ||
    !validatePhone() ||
    !validatePwd()
  ) {
    event.preventDefault();

    var errorSpan = $(".errorSpan").val();
    if (password === "" || phoneNo === "" || mail === "" || fullName) {
      errorSpan.html("Fill all the details");
      errorSpan.css("color", "red");
    } else {
      window.location.href("/registeration-Page-2.html");
    }
  }
});
