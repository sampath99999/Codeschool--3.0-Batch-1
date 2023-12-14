if (!localStorage.getItem("token")) {
    location.href = "./login.html";
}

$(document).ready(() => {
    getUser();
    getPosts();

    $('.post-icon').on('click',function (){
        var postId = this.id;
        console.log(postId);
        
        if ($(this).hasClass('bi-check-circle')) {
            $('#'+postId).removeClass('bi-check-circle').addClass('bi-check-circle-fill');
        } else {
            $('#'+postId).removeClass('bi-check-circle-fill').addClass('bi-check-circle');
        }
        
    });

    $('#startReadingLi').on('click', () => {
        window.location.href = './dashboard.html';
    })

    $('#logoutButton').on('click', function () {
        localStorage.clear();
        location.reload();
    })
});


function getUser() {
    const token = localStorage.getItem("token");

    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getUser.php",
        method: "POST",
        data: { token },
        success: function (sendResponse) {
            const response = JSON.parse(sendResponse);
            console.log(response);
            if (!response.status) {
                alert(response.message);
                return false;
            } else {
                localStorage.setItem("user_id", response.data.user.user_id);
            }
        },
        error: function (sendResponse) {
            const response = JSON.parse(sendResponse);
            console.log(response);
        }
    });
}

function getPosts() {
    $.ajax({
        url: "http://localhost/Codeschool/Task7/BlogPost/server/api/getPublishedPosts.php",
        method: "GET",
        success: function (posts) {
            console.log(posts);
            posts.forEach(post => {
                const newDiv = document.createElement('div');
                newDiv.className = 'post mb-5';
                newDiv.innerHTML = `
                    <div class="post-title d-flex justify-content-between align-items-baseline">
                        <h1>${post.post_title}</h1>
                        <img src="./assets/logos/bp-logo-yellow.png" alt="Bp"/>
                    </div> 
                    <div class="post-content">
                        <p>${post.post_text}</p>
                    </div>
                    <div class="post-footer">
                        <i class="bi bi-check-circle post-icon" id="postId${post.user_id}" onChange="addCircle(this)"></i>
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