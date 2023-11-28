if (localStorage.getItem("token")) {
    location.href = "./index.html";
}
let params = new URLSearchParams(location.search);
if (params.get("error")) {
    alert(params.get("error"));
    window.history.replaceState(null, "", window.location.pathname);
}


const email = document.getElementById('email');
const password = document.getElementById('pass');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/; 


  email.addEventListener('change',()=>{
    if (!emailPattern.test(email.value)) {
        email.classList.add("is-invalid");
        emailError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Please Enter Your Email Address.</i>';
       
      }else {
        email.classList.replace("is-invalid","is-valid");
        emailError.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
      }
     
  })
password.addEventListener('change', ()=> {
    if (!passwordPattern.test(password.value)) {
    password.classList.add("is-invalid");
    passwordError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Please Enter Your Password</i>';
  } else {
    password.classList.replace("is-invalid","is-valid");
    passwordError.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
  }
});



function login() {
    let email = $("#email").val();
    let password = $("#pass").val();
    $.ajax({
        url: "http://localhost/Test/Server/logIn.php",
        method: "POST",
        data: {
            email,
            password
        },
        success: (response) => {
            response = JSON.parse(response);
            if (!response.status) {
                alert(response.message);
                return false;
            } else{
            localStorage.setItem("token", response.data.token);
            location.href = "./index.html";
        }
    },
        error: (response) => {
            console.log(response);
        },
    });
}

      