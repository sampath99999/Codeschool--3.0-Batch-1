if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}
$(document).ready(function () {
    getUser();
    getPostsById();

    $('#startReadingLi').on('click', () => {
        window.location.href = './dashboard.html';
    })


    $('#sendDataForApproval').on('click', function () {
        const userId = localStorage.getItem("user_id");
        const postTitle = $('#postTitle').val();
        const postContent = $('#postContent').val();

        $.ajax({
            url: "http://localhost/Codeschool/Task7/BlogPost/server/api/setPost.php",
            method: "POST",
            data: { userId, postTitle, postContent },
            success: function (sendResponse) {
                const response = JSON.parse(sendResponse);
                console.log(response.message);
                if (!response.status) {
                    alert(response.message);
                    return false;
                } else {
                    Swal.fire({
                        title: "Good job!",
                        text: response.message,
                        icon: "success"
                    });
                    location.reload();
                }
            },
            error: function (sendResponse) {
                const response = JSON.parse(sendResponse);
                console.log(response);
                alert(response.message);
            }
        });
    });
    
});


function getUser() {
    const token = localStorage.getItem("token");

    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getUser.php",
        method: "POST",
        data: { token },
        success: function (sendResponse) {
            const response = JSON.parse(sendResponse);
            

            $('#profileName').text(response.data.user.user_name);

        },
        error: function (sendResponse) {
            const response = JSON.parse(sendResponse);
            alert(response.message);
        }
    });
}

function getPostsById() {
    const user_id = localStorage.getItem("user_id");

    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getPostsById.php",
        method: "POST",
        data: { user_id },
        success: function (posts) {
            posts.forEach(post => {
                const newDiv = document.createElement('div');
                newDiv.className = "post mb-5";
                newDiv.innerHTML = `
                <div class="post-title d-flex justify-content-between align-items-baseline">
                    <div>
                        <h1>${post.post_title}</h1>
                        <label class="text-danger">/${post.status_name}</label>
                    </div>
                    <img src="./assets/logos/bp-logo-yellow.png" alt="Bp"/>
                </div> 
                <div class="post-content">
                    <p>${post.post_text}</p>
                </div>
                <div class="post-footer">
                    <i class="bi bi-check-circle post-icon" id="postId${post.post_id}"></i>
                    <div class="post-details d-flex justify-content-between mt-3" >
                        <h6>By ${post.user_name}</h6>
                        <h6>on ${post.post_date}</h6>
                    </div>
                </div>
                
                `;

                var body = $('#postContainer');
                body.append(newDiv);
            });
        },
        error: function (response) {
            console.log(response);
        }
    })
}

