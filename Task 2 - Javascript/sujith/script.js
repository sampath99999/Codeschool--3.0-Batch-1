fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{return(DisplayData(json),console.log(json))})

            
const display= document.getElementById('productsDetails');
function addProduct(){
    let proTitle=document.getElementById('proTitle').value;
    let proPrice=document.getElementById('proPrice').value;
    let proDescription=document.getElementById('proDescription').value;
    let proImage=document.getElementById('proImage').value;
    let proCategory=document.getElementById('proCategory').value;
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
            .then(json=>{ return(  display.innerHTML+=`<tr class="bg-white">
            <th class="p-3" scope="row">
              <form class="mt-2" action="">
                <input type="checkbox" name="" id="${json.id}" />
              </form>
            </th>
            <td class="p-3">
              <img
                class="float-start"
                src="${proImage}"
                alt=""
                width="50px"
                height="50px"
                srcset=""
              />
              <h4>${proTitle}</h4>
              <p>${proDescription}</p>
            </td>
            <td class="p-3">
              <button class="btn btn-light">${proCategory}</button>
            </td>
            <td class="p-3"><p class="mt-2">${proPrice}</p></td>
            <td class="p-3"><p class="mt-2">${proPrice}</p></td>
            <td class="p-3">
              <button class="btn btn-light">Edit</button>
            </td>
          </tr>`,console.log(json))
              })

}
function getId(e){
    console.log(e);
    console.log("CLICKED")
}
function updateProduct(){
    let updateTitle=document.getElementById('updateTitle').value;
    let updatePrice=document.getElementById('updatePrice').value;
    let updateDescription=document.getElementById('updateDescription').value;
    let updateImage=document.getElementById('updateImage').value;
    let updateCategory=document.getElementById('updateCategory').value;
}



function DisplayData(products){
    products.forEach(element => {
        return(
         display.innerHTML+=`
       <tr class="bg-white">
                        <th class="py-3" scope="row">
                          <form class="mt-2" action="">
                            <input type="checkbox" name="" id="${element.id}" />
                          </form>
                        </th>
                        <td class="py-3 d-flex">
                          <img
                            class="float-start"
                            src="${element.image}"
                            alt=""
                            width="60px"
                            height="60px"
                            srcset=""
                          />
                          <div class="ps-2">
                            <p class="fw-bold fs-5 pb-0 d-block">
                            ${element.title.split(' ').slice(0,3).join(' ')}
                            </p>
                            <p
                              class="text-secondary fw-semibold m-0 d-inline-block"
                            >
                            ${element.description.split(' ').slice(0,7).join(' ')}
                            </p>
                          </div>
                        </td>
                        <td class="py-3">
                          <button class="btn btn-light">${element.category}</button>
                        </td>
                        <td class="py-3 text-center">
                        <div class="mt-2">
                        <i class="bi bi-circle-fill text-primary"></i>
                        <i class="bi bi-circle-fill text-secondary"></i>
                        <i class="bi bi-circle-fill text-warning"></i>
                        <i class="bi bi-circle-fill text-dark"></i>
                      </div>
                        </td>
                        <td class="py-3 text-center"><p class="mt-2 fw-bold">${element.price}$</p></td>
                        <td class="py-3 text-center"><p class="mt-2">38</p></td>
                        <td class="py-3 text-center"><p class="mt-2">UY3749</p></td>
                        <td class="py-3 text-center">
                          <p class="mt-2">
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill"></i> ${element.rating.rate}
                          </p>
                        </td>
                        <td class="py-3 text-center">
                          <div class="d-flex">
                          <button id="${element.id}  type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#UpadtemodalId" onclick="getId(${element.id})">
                          Edit
                        </button>
                            <button class="btn btn-light m-1">
                              <i class="bi bi-three-dots"></i>
                            </button>
                          </div>
                        </td>
                      </tr>`   
        );
        
    });


}