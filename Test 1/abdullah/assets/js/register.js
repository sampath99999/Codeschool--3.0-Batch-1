$(document).ready(function () {
  $("#fullname").on("input", function () {
    var fullNameInput = $(this);
    var validationMessage = $("#validationMessage");

    if (fullNameInput.val().trim() === "") {
      validationMessage.text("Full Name is required");
    } else {
      validationMessage.text("");
    }
  });

  $("email").on("input", function () {
    var emailInput = $(this);
    var validationMessage = $("#validationMessage2");

    var emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(emailInput.val())) {
      emailInput.addClass("is-invalid").removeClass("is-valid");
      validationMessage.text("Invalid Email Address");
    } else {
      emailInput.removeClass("is-invalid").addClass("is-valid");
      validationMessage.text("");
    }
  });

  $("#phoneNo").on("input", function () {
    var phoneInput = $(this);
    var validationMessage = $("#validationMessage");

    var phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneInput.val())) {
      validationMessage.text("Invalid Phone Number");
    } else {
      validationMessage.text("");
    }
  });

  $("#password").on("input", function () {
    var passwordInput = $(this);
    var validationMessage = $("#validationMessage");

    if (passwordInput.val().length < 6) {
      validationMessage.text("Password must be at least 6 characters");
    } else {
      validationMessage.text("");
    }
  });
});

const fNamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordPattern =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneNoPattern =
  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/;

function validate(input, pattern) {
  input.on("input", function () {
    const validationMessage = $("#validationMessage");
    if (pattern.test(input.val())) {
      validationMessage.text("Valid Input");
      console.log("Valid Input");
    } else {
      console.log("Invalid Input");
      validationMessage.text("Invalid Input");
    }
  });
}

const fName = $("#full-name");
const email = $("#email");
const phoneNo = $("#phoneNo");
const password = $("#password");

validateName(fName, fNamePattern);
validateMail(email, emailPattern);
validatePhone(phoneNo, phoneNoPattern);
validatePwd(password, passwordPattern);

function validateName(fName, fNamePattern) {
  fName.on("input", function () {
    const validationMessage = $("#validationMessage");
    if (fName.val().length >= 5) {
      validationMessage.text("Valid Input");
      console.log("Valid Input");
    } else {
      console.log("Invalid Input");
      validationMessage.text("Invalid Input");
    }
  });
}

function validatePhone(phoneNo, phoneNoPattern) {
  phoneNo.on("input", function () {
    const validationMessage = $("#validationMessage");
    if (phoneNoPattern.test(phoneNo.val())) {
      validationMessage.text("Valid Input");
      console.log("Valid Input");
    } else {
      console.log("Invalid Input");
      validationMessage.text("Invalid Input");
    }
  });
}

function validateMail(email, mailPattern) {
  email.on("input", function () {
    const validationMessage = $("#validationMessage");
    if (emailPattern.test(email.val())) {
      validationMessage.text("Valid Input");
      console.log("Valid Input");
    } else {
      console.log("Invalid Input");
      validationMessage.text("Invalid Input");
    }
  });
}

function validatePwd(password, passwordPattern) {
  password.on("input", function () {
    const validationMessage = $("#validationMessage");
    if (passwordPattern.test(password.val())) {
      validationMessage.text("Valid Input");
      console.log("Valid Input");
    } else {
      console.log("Invalid Input");
      validationMessage.text("Invalid Input");
    }
  });
}

function next() {
  const currentPage = window.location.pathname;

  if (currentPage == "/templates/registeration-Page-1.html") {
    const fullName = $("#fullname").val();
    const email = $("#email").val();
    const phone = $("#phoneNo").val();
    const password = $("#password").val();
    window.location.href = "/templates/registeration-Page-2.html";
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
      const selectedRadioButton = $('input[name="donationAmount"]:checked');
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
  }
}
