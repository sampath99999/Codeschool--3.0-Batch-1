let params = new URLSearchParams(location.search);
if (params.get("error")) {
    alert(params.get("error"));
    window.history.replaceState(null, "", window.location.pathname);
}

function logout() {
           localStorage.clear();

            location.href = "./logIn.html";
        
}

