
var productCard='';
var contacts='';

$.ajax({url:"https://picsum.photos/v2/list?page=2&limit=100",
type:"GET",
success:function(product){
    console.log(product);
    // products.forEach(product => {
    //     console.log(product);
        
    //});
    for( i=0;i<product.length;i++){
       
        productCard +=`<div class="card mb-3 bg-black ">
        <div class="d-flex mb-2 ">
                <a href="" class="text-decoration-none text-light"
                  ><img
                    src="${product[i].download_url}"
                    alt="profile pic"
                    class="img rounded-circle me-3"
                    width="40px"
                    height="40px" /><span
                    
                    class="fs-6 fw-bold "
                  >${product[i].author}</span
                ></a>
                <a href="" class="text-decoration-none text-secondary ms-auto me-2"><i class="bi bi-three-dots"></i></a>
                <a href="" class="text-decoration-none text-secondary me-4"><i class="bi bi-x-lg"></i></a>

              </div>
              <div class="card-body">
              <p class="card-text text-secondary">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text text-secondary"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
        <img src="${product[i].download_url}" class="card-img-top" alt="..." width="350px" height="350px">
       
        <div class="d-flex" ><h6><i class="bi bi-hand-thumbs-up fs-6" id="AA"></i></h6><span><i class="bi bi-chat"></i></span></div>
       
      </div> `;

        $("#newsfeeds").html(productCard);
        
       
      }
      for( i=0;i<product.length;i++){
       
        contacts+=`<div class="mb-2 ">
        <a href="" class="text-decoration-none text-light"
          ><div class="d-inline"><span class=''><i class="bi bi-dot position-absolute right-0 bottom-0 text-success fs-2"></i></span><img
            src="${product[i].download_url}"
            alt="profile pic"
            class="img rounded-circle me-3"
            width="40px"
            height="40px" /></div><span
            
            class="fs-6 fw-bold text-white"
          >${product[i].author}</span
        ></a>
      </div>
      `;
        $("#contacts").html(contacts);

      }

       
    },
    error:function(){
        console.log("401 error");
    }
       
    })

    // $('').toggleClass(click,function (){
     

    // })
    $(`#AA`).click(function(e) {
      e.preventDefault();
     // $(this). removeClass('text-secondary');
      $(this). addClass('text-primary');
      //$(".like"). removeClass('bi-hand-thumbs-up');
      $("#like").addClass('bi-hand-thumbs-up-fill');

     // $("#like").replaceClass("bi-hand-thumbs-up-fill");
     // $("#wrapper").toggleClass("toggled");
  });
  