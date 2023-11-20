if (localStorage.getItem("token")) {
    location.href = "./index.html";
}

   



function register() {
  
let fullname = $("#firstName").val() + "  "+$("#lastName").val() ;
let email = $("#email-or-contact").val();
let password = $("#password").val();
let dob=$("#day").val() +"-"+$("#month").val() +"-"+$("#year").val();
let gender=$('input[name="gender"]:checked').val();


    $.ajax({
        url: "./api/register.php",
        method: "POST",
        data: {
            fullname,
            email,
            password,
            dob,
            gender
        },
        success: (response) => {
            response = JSON.parse(response);
            if (!response.status) {
                alert(response.message);
                return false;
            } else {
		 alert("successfully registered");
}
            location.href = "./login.html";
        },
        error: (response) => {
            console.log(response);
        },
    });
}



    const form = document.getElementById('signupForm');
    const firstname = document.getElementById('firstName');
    const lastname = document.getElementById('lastName');
    const email = document.getElementById('email-or-contact');
    const password = document.getElementById('password');
  //Error Message Variables
    const firstnameError = document.getElementById('firstnameError');
    const lastnameError = document.getElementById('lastnameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
   
  //Pattern Variables
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z]).{3,16}$/;  
   // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/; 
  
    firstname.addEventListener('change', ()=>{
      if (!usernamePattern.test(firstname.value)) {
        firstname.classList.add("is-invalid");
        firstnameError.innerHTML = '<i class="bi bi-x-circle-fill  text-danger">Invalid firstname. 3-16 characters.</i>';
      } else {
        firstname.classList.replace("is-invalid","is-valid");
        firstnameError.innerHTML = '<i class="bi bi-person-check-fill text-success"></i>';
      }
    });
   lastname.addEventListener('change', ()=>{
        if (!usernamePattern.test(lastname.value)) {
            lastname.classList.add("is-invalid");
         lastnameError.innerHTML = '<i class="bi bi-x-circle-fill  text-danger">Invalid lastname. Alphanumeric & underscores, 5-16 characters.</i>';
        } else {
            lastname.classList.replace("is-invalid","is-valid");
            lastnameError.innerHTML = '<i class="bi bi-person-check-fill text-success"></i>';
        }
      });

      email.addEventListener('change',()=>{
        if (!(email.value).length>8) {
            email.classList.add("is-invalid");
            emailError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Enter Your Email Address.</i>';
           
          }else {
            email.classList.replace("is-invalid","is-valid");
            emailError.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
          }
         
      })
    
    
    
    password.addEventListener('change', ()=> {
      if (!passwordPattern.test(password.value)) {
        password.classList.add("is-invalid");
        passwordError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Invalid password. At least 8 characters with at least one digit, one lowercase and one uppercase letter.</i>';
      } else {
        password.classList.replace("is-invalid","is-valid");
        passwordError.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
      }
    });
  
  
  
    form.addEventListener('submit', (event)=> {
      if (!usernamePattern.test(firstname.value)) {
       firstname.classList.add("is-invalid");
        firstnameError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Enter UserName</i>';
        event.preventDefault();
      }
      if (!usernamePattern.test(lastname.value)) {
         lastname.classList.add("is-invalid");
          lastnameError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Enter UserName</i>';
          event.preventDefault();
        }
  
      if (!(email.value).length>8) {
        email.classList.add("is-invalid");
        emailError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Enter Your Email Address.</i>';
        event.preventDefault();
      }
     
      if (!passwordPattern.test(password.value)) {
        password.classList.add("is-invalid");
        passwordError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Please Enter Your Password</i>';
        event.preventDefault();
      }
  
    
    });

  

