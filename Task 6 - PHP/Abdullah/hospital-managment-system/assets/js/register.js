function validatePhone() {
  var phone = $(".phone").val();
  var regex = /^\d{10}$/;
  var validationMessagephone = $("#validationMessagephone");
  if (!regex.test(phone)) {
    validationMessagephone.html("Invalid phone number.");
    return false;
  } else {
    validationMessagephone.html("");
    return true;
  }
}
function validateAge() {
  var age = parseInt($(".age").val());
  var validationMessageAge = $("#validationMessageAge");
  
  if (isNaN(age) || age < 10 || age > 50) {
    validationMessageAge.html("Invalid Age");
    console.log(age);
    return false;
  } else {
    validationMessageAge.html("");
    console.log(age);
    return true;
  }
}


function validatePassword() {
  var password = $(".password").val();
  var validationMessagepwd = $("#validationMessagepwd");
  if (password.length < 7) {
    validationMessagepwd.html("Password must be at least 8 characters.");
    return false;
  } else {
    validationMessagepwd.html("");
    return true;
  }
}

function validateMail() {
  var email = $(".email").val();
  var regex = /^\S+@\S+\.\S+$/;
  var validationMessageemail = $("#validationMessageemail");
  if (!regex.test(email)) {
    validationMessageemail.html("Invalid email format.");
    return false;
  } else {
    validationMessageemail.html("");
    return true;
  }
}
var bloodGroup;

$("#bloodGroup").change(function () {
  bloodGroup = $(this).val();

  console.log("Selected Blood Group Value: ", bloodGroup);
});

function register() {
  try {
    var email = $(".email").val();
    var password = $(".password").val();
    var phone = $(".phone").val();
    var name = $(".name").val();
    var age = $(".age").val();
    var gender = $(".gender").val();
    var bloodGroup = $(".bloodGroup").val();

    console.log(email, password, phone, name, gender, bloodGroup, age);

    if (
      email === "" ||
      password === "" ||
      phone === "" ||
      name === "" ||
      gender === "" ||
      bloodGroup === "" ||
      age === ""
    ) {
      alert("Please enter All details");
      return;
    }

    if (!validateMail() || !validatePassword() || !validatePhone()) {
      throw new Error("Enter valid details");
    }

    console.log("before call");
    $.post("http://localhost:3000/api/register.php", {
      email: email,
      name: name,
      phone: phone,
      password: password,
      gender: gender,
      bloodGroup: bloodGroup,
      age: age,
    }).then(function (res) {
      console.log("after call");

      var resData = JSON.parse(res);
      console.log(resData);
      console.log(resData.status);
      console.log(resData.data);

      if (resData.status == false || resData.status == "false") {
        location.href = "/templates/register.html";
        console.log("inside false status");
      }

      if (resData.status == true || resData.status == "true") {
        swal("Registered successfully!", "Logging you in", "success");

        localStorage.setItem("token", resData.data.token);
        localStorage.setItem("id", resData.data.id);
        location.href = "/templates/home.html";

        console.log("inside true status");
      } else {
        swal({
          title: "Invalid Credentials",
          text: "",
          icon: "warning",
          button: "OK",
      })      }
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}
