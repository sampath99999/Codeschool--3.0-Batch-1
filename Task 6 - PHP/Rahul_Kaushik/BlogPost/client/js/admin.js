if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

$(document).ready(function () {
    getAllUsers();
    getUnpublishedPosts();
    getPublishedPosts();

    $('#logoutButton').on('click', function () {
        localStorage.clear();
        location.reload();
    });

    $('#deleteUserButton').on('click', function () {
        const userId = $('#userId').val();
        console.log(userId);
        $.ajax({
            url: "http://localhost/Codeschool/Task7/BlogPost/server/api/deleteUser.php",
            method: "POST",
            data: { userId },
            success: function (sendResponse) {
                const response = JSON.parse(sendResponse);
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
                alert(response.message);
            }
        });
    });

    
});
function getAllUsers() {
    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getAllUsers.php",
        method: "GET",
        success: function (users) {
            users.forEach(user => {
                const newDiv = document.createElement('div');
                newDiv.className = "post mb-5"
                newDiv.innerHTML = `
                <div class="post-title d-flex justify-content-between align-items-baseline">
                    <div>
                        <h1>${user.user_name}<span>#${user.user_id}</span></h1>
                        <label class="text-danger">/${user.role_name}</label>
                    </div>
                    <img src="./assets/logos/bp-logo-yellow.png" alt="Bp"/>
                </div> 
                <div class="post-content">
                    <h6>Username : ${user.user_name}</h6>
                    <h6>Email : ${user.user_email}</h6>
                    <h6>Role Name : ${user.role_name}</h6>
                </div>
                `;

                var body = $('#allUserContainer');
                body.append(newDiv);
            });
        },
        error: function (sendResponse) {
            const response = JSON.parse(sendResponse);
            alert(response.message);
        }
    })
}

function getUnpublishedPosts() {
    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getUnpublishedPosts.php",
        method: "GET",
        success: function (posts) {
            posts.forEach(post => {
                const newDiv = document.createElement('div');
                newDiv.className = "post mb-5";
                newDiv.innerHTML = `
                <div class="post-title d-flex justify-content-between align-items-baseline">
                    <div>
                        <h1>${post.post_title}<span>#${post.post_id}</span></h1>
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

                var body = $('#unpublishedPostContainer');
                body.append(newDiv);
            });
        },
        error: function (response) {
            console.log(response);
        }
    })
}

function getPublishedPosts() {
    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getPublishedPosts.php",
        method: "GET",
        success: function (posts) {
            posts.forEach(post => {
                const newDiv = document.createElement('div');
                newDiv.className = "post mb-5";
                newDiv.innerHTML = `
                <div class="post-title d-flex justify-content-between align-items-baseline">
                    <div>
                        <h1>${post.post_title}<span>#${post.post_id}</span></h1>
                        <label class="text-success">/${post.status_name}</label>
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

                var body = $('#publishedPostContainer');
                body.append(newDiv);
            });
        },
        error: function (response) {
            console.log(response);
        }
    })
}