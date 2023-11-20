
if (localStorage.getItem("token")) {
    location.href = "./index.html";
}

let params = new URLSearchParams(location.search);
if (params.get("error")) {
    alert(params.get("error"));
    window.history.replaceState(null, "", window.location.pathname);
}

function login() {
    let email = $("#email-or-contact").val();
    let password = $("#password").val();

    // Do the validation

    $.ajax({
        url: "./api/login.php",
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
            }
            localStorage.setItem("token", response.data.token);
            location.href = "./index.html";
        },
        error: (response) => {
            console.log(response);
        },
    });
}

       
             const email = document.getElementById('email-or-contact');
            const password = document.getElementById('password');
          //Error Message Variables
          const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
           
         
          
           
        
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
              if ((password.value).length==0) {
                password.classList.add("is-invalid");
                passwordError.innerHTML = '<i class="bi bi-x-circle-fill text-danger">Invalid password. At least 8 characters with at least one digit, one lowercase and one uppercase letter.</i>';
              } else {
                password.classList.replace("is-invalid","is-valid");
                passwordError.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
              }
            });
          
          
          
           
        
        