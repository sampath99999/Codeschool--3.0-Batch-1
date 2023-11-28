function register() {
    let fullName = $("#firstName").val() + "  "+$("#lastName").val() ;
    let email = $("#email").val();
    let gender=$('input[name="gender"]:checked').val();
    let password = $("#pass").val();
    
      $.ajax({
            url: "http://localhost/Test/Server/singUp.php",
            method: "POST",
            data: {
                fullName,
                email,
                gender,
                password  
            },
            success: (response) => {
                response = JSON.parse(response);
                if (!response.status) {
                    Swal.fire({
                        title: "Bad job!",
                        text: response.message,
                        icon: "error"
                      });
                    return false;
                } else {
             Swal.fire({
                title: "Good job!",
                text: response.message,
                icon: "success"
              });
    }
                location.href = "./login.html";
            },
            error: (response) => {
                console.log(response);
            },
        });
    }
    


    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('pass');
    const confirmPassword = document.getElementById('confirmPassword');
    const gender=document.getElementById('gender');

  //Error Message Variables
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError=document.getElementById('genderError');
   
  //Pattern Variables
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z]).{3,16}$/;  
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/; 
  
    firstName.addEventListener('change', ()=>{
      if (!usernamePattern.test(firstName.value)) {
        firstName.classList.add("is-invalid");
        firstNameError.innerHTML = '<i class="bi bi-x-circle-fill  text-danger">First name should be 3-16 characters.</i>';
      } else {
        firstName.classList.replace("is-invalid","is-valid");
        firstNameError.innerHTML = '<i class="bi bi-person-check-fill text-success"></i>';
      }
    });
    lastName.addEventListener('change', ()=>{
        if (!usernamePattern.test(lastName.value)) {
            lastName.classList.add("is-invalid");
         lastNameError.innerHTML = '<i class="bi bi-x-circle-fill  text-danger">Last name should be 3-16 characters.</i>';
        } else {
            lastName.classList.replace("is-invalid","is-valid");
            lastNameError.innerHTML = '<i class="bi bi-person-check-fill text-success"></i>';
        }
      });

      email.addEventListener('change',()=>{
        if (!emailPattern.test(email.value)) {
            email.classList.add("is-invalid");
            emailError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Enter Your Valid  Email Address.</i>';
           
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
    confirmPassword.addEventListener('change', ()=> {
        if (!password.value==confirmPassword.value) {
          confirmPassword.classList.add("is-invalid");
          confirmPasswordError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Invalid password.</i>';
        } else {
          password.classList.replace("is-invalid","is-valid");
          confirmPasswordError.innerHTML = '<i class="bi bi-check-circle-fill text-success">Password Matched</i>';
        }
      });
  