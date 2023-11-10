let url='https://fakestoreapi.com/products';
var itemsList=document.getElementById('itemsList');

async function getData(){
    let request= await fetch(url);
    var itemsList=document.getElementById('itemsList');
    let data=await request.json()
    console.log(data[0])
    data.forEach(list => {
        let i=document.createElement('div')
        i.classList.add("container")
        i.classList.add("bg-white")
        i.classList.add("row")
        i.classList.add("col-12")
        i.classList.add("m-2")
        i.classList.add("d-flex")
        i.classList.add("align-items-center")
        i.classList.add("rounded-3")
        i.classList.add("addElement")
        i.innerHTML=`<div class="col-4 d-flex">
            <input type="checkbox" >
            <div  class="m-3 " style="width: 100px;">
                <img src="${list.image}" alt="" width="100%">
            </div>
            <div>
                <h6 class="text-black fw-semibold pt-4 medium-font">${list.title}</h6>
                <p class="text-muted medium-font">Your perfect pack for everyday use and walks in the forest</p>
            </div>
        </div>
        <div class="col-1  ">
            <a  class="btn btn-light   rounded-2 display-1 small-font p-1">${list.category}</a>
        </div>
        <div class="col-1  ">
            <i class="bi bi-circle-fill small-font  " style="color: brown;"></i>
            <i class="bi bi-circle-fill small-font  " style="color: rgb(161, 165, 42);"></i>
            <i class="bi bi-circle-fill small-font  " style="color: rgb(42, 118, 165);"></i>

        </div>
        <div class="col-1  ">
           <p class="text-black fw-semibold medium-font mt-4">$${list.price}</p>
        </div>
        <div class="col-1  ">
            <p class="text-black fw-semibold medium-font  mt-4 text-center ">${list.rating.count}</p>
         </div>
         <div class="col-1  ">
            <p class="text-black fw-semibold medium-font mt-4 text-center ">${list.id} </p>
         </div>
         <div class="col-3 text-center  ">
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star small-font "></i>
            <p class="text-muted fw-semibold medium-font mt-5 pe-3 d-inline">${list.rating.rate}</p>
            <a  class="btn btn-light rounded-2 display-1 px-2 medium-font ">Edit</a>
            <a  class="btn btn-light rounded-2 s display-1 p-1"><i class="fs-5 bi bi-three-dots small-font" style="color:hsl(0, 6%, 78%);"></i></a>
        </div>
    `
    itemsList.appendChild(i);
    });
}
getData()


function addProduct(){
    let proTitle=document.getElementById('proTitle').value;
    let proPrice=document.getElementById('proPrice').value;
    let proDescription=document.getElementById('proDescription').value;
    let proImage=document.getElementById('proImage').value;
    let proCategory=document.getElementById('proCategory').value;
    let addList=document.createElement('div');
    addList.classList.add("container")
    addList.classList.add("bg-white")
    addList.classList.add("row")
    addList.classList.add("col-12")
    addList.classList.add("m-2")
    addList.classList.add("d-flex")
    addList.classList.add("align-items-center")
    addList.classList.add("addElement")
    addList.classList.add("rounded-3")
    var itemsList=document.getElementById('itemsList');

    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: proTitle,
                    price: proPrice,
                    description: proDescription,
                    image: proImage,
                    category: proCategory
                }
            )
        })
            .then(res=>res.json())
            .then(json=>{ return(  
                addList.innerHTML+=`
            <div class="col-4 d-flex">
            <input type="checkbox" >
            <div  class="m-3 " style="width: 100px;">
                <img src="${proImage}" alt="" width="100%">
            </div>
            <div>
                <h6 class="text-black fw-semibold pt-4 medium-font">${proTitle}</h6>
                <p class="text-muted medium-font">${proDescription}</p>
            </div>
        </div>
        <div class="col-1  ">
            <a  class="btn btn-light   rounded-2 display-1 small-font p-1">${proCategory}</a>
        </div>
        <div class="col-1  ">
            <i class="bi bi-circle-fill small-font  " style="color: brown;"></i>
            <i class="bi bi-circle-fill small-font  " style="color: rgb(161, 165, 42);"></i>
            <i class="bi bi-circle-fill small-font  " style="color: rgb(42, 118, 165);"></i>

        </div>
        <div class="col-1  ">
           <p class="text-black fw-semibold medium-font mt-4">$${proPrice}</p>
        </div>
        <div class="col-1  ">
            <p class="text-black fw-semibold medium-font  mt-4 text-center ">120</p>
         </div>
         <div class="col-1  ">
            <p class="text-black fw-semibold medium-font mt-4 text-center ">${json.id} </p>
         </div>
         <div class="col-3 text-center  ">
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star-fill small-font "></i>
            <i class="bi bi-star small-font "></i>
            <p class="text-muted fw-semibold medium-font mt-5 pe-3 d-inline">4.5</p>
            <a  class="btn btn-light rounded-2 display-1 px-2 medium-font ">Edit</a>
            <a  class="btn btn-light rounded-2 s display-1 p-1"><i class="fs-5 bi bi-three-dots small-font" style="color:hsl(0, 6%, 78%);"></i></a>
        </div>`, itemsList.appendChild(addList)
            )
              }
            )
}