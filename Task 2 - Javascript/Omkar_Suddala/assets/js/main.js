// GET AND POST PRODUCTS
async function productRender() {
    const productsDetails = document.getElementById('productsDetails');
    const newAdded = document.getElementById('newProducts');
    //POST NEW PRODUCT
    async function addNewProduct(event) {
      event.preventDefault();
      const newProduct = {
        title: document.getElementById('newProductTitle').value,
        price: document.getElementById('newProductPrice').value,
        description: document.getElementById('newProductDescription').value,
        image: document.getElementById('newProductImage').value,
        category: document.getElementById('newProductCategory').value,
        rate:  document.getElementById('newProductRating').value,
        
      };
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });
        if (response.ok) {
          const addedProduct = await response.json();
          console.log('New product added:', addedProduct);
          const newPro = document.createElement('tr');
         newPro.classList.add('rounded-5', 'bg-white', 'my-4', 'p-3');
         newPro.setAttribute('id', `up${addedProduct.id}`)
          newPro.innerHTML = `
              <!-- Your HTML content for the new product -->
              <td class=''style='width: 30px'> 
                                    <label class="control control--checkbox">
                                    <input type="checkbox" value='${addedProduct.id}'' />
                                    <div class="control__indicator"></div>
                                  </label>
                                </th></td>
                                      <td class="col-3">
                                      <div class="d-flex" '>
                                          <div class='me-3  text-center'style='background-color:#BCD1E1; height:fit-content; '> <img
                                          src="${addedProduct.image}"
                                          
                                          alt="${addedProduct.title}"
                                          width="50px"
                                          height="50px"
                                      /> </div>
                                         <div class=''><span class="fs-6 fw-bold text-decoration-justify overflow-hidden">${addedProduct.title}</span></br> 
                                         <p class='text-secondary w-100' style='height:46px;overflow:hidden;'>${addedProduct.description}</p>
                                          </div>
                                      </td>
                                      <td>
                                          <span class="badge bg-secondary">${addedProduct.category}</span>
                                      </td>
                                      <td>
                                          <ul class="list-group list-group-horizontal ">
                                              <li class="list-group-item border-0">
                                              <i class="bi bi-circle-fill color-option-5 "></i>
                                              <i class="bi bi-circle-fill color-option-1 "></i>
                                              <i class="bi bi-circle-fill color-option-3 "></i>
                                              <i class="bi bi-circle-fill color-option-4 "></i>
                                              </li>
                                          </ul>
                                      </td>
                                      <td class='text-secondary fs-6 fw-bold'>₹${addedProduct.price}</td>
                                      <td class='text-secondary fs-6 fw-bold'>25</td>
                                      <td class='text-secondary fs-6 fw-bold'>UK5894</td>
                                      <td class='text-secondary'>
                                          <span class='text-warning '>
                                              <i class="bi bi-star-fill"></i>
                                              <i class="bi bi-star-fill"></i>
                                              <i class="bi bi-star-fill"></i>
                                              <i class="bi bi-star-fill"></i>
                                              <i class="bi bi-star icon-color"></i>
                                          </span>
                                         4.5 (155)
                                      </td>
                                      <td>
                                          <button class='btn  icon-bg-color fw-bold text-dark d-none d-lg-inline'  data-bs-toggle='modal'
                                          data-bs-target='#productUpdate'  onclick='updateProduct(${addedProduct.id})' value='${addedProduct.id}'>Edit</button>
                                          <button class="btn  icon-bg-color fw-bold text-dark" data-bs-toggle='dropdown' onclick='viewProduct(${addedProduct.id})'>
                                              <i class="bi bi-three-dots"></i>
                                          </button>
                                          <ul
                                          class="dropdown-menu  shadow border-white bg-white "
                                        >
                                          <li
                                            class='dropdown-header d-lg-none d-block text-dark icon-bg-color rounded-3'
                                          >
                                          <button class='btn btn-secondary' data-bs-toggle='modal'
                                          data-bs-target='#productUpdate'   onclick='updateProduct(${addedProduct.id})'  value='${addedProduct.id}'>Edit</button>
                                          </li>
                                          <li
                                          class="dropdown-header text-dark icon-bg-color rounded-3 "
                                        >
                                          
                                          <button class='btn btn-primary'  data-bs-toggle='modal'
                                          data-bs-target='#viewProduct'>View<i class="bi bi-eye"></i></button>
                                        </li>
                                          <li
                                            class="dropdown-header text-dark icon-bg-color rounded-3 "
                                          >
                                            
                                          <button class='btn btn-danger'  data-bs-toggle='modal'
                                          data-bs-target='#deleteProduct' onclick='deleteProduct(${addedProduct.id})' value='${addedProduct.id}' >Delete <i class="bi bi-trash"></i></button>
                                        </li>
                                        
                                        </ul>
                                      </td>
          `;
          newAdded.appendChild(newPro);
        } else {
          throw new Error('Failed to add a new product');
        }
      } catch (error) {
        console.error('Error adding a new product:', error);
      }
    }
  
    document.getElementById('addProductForm').addEventListener('submit', addNewProduct);
  //GET ALL PRODUCTS
    async function renderProduct() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        products.forEach(product => {
          const productCard = document.createElement('tr');
          productCard.setAttribute('id',  `up${product.id}`);
          productCard.setAttribute('value',`${product.id}`);
         productCard.classList.add('rounded-5', 'bg-white', 'my-4', 'p-3','ttt');
          productCard.innerHTML = `
              <td class='' style='width: 30px'> 
                          <label class="control control--checkbox">
                          <input type="checkbox" value='${product.id}' />
                          <div class="control__indicator"></div>
                        </label>
                      </td>
                            <td class="col-3"  data-bs-toggle='modal'
                            data-bs-target='#viewProduct' >
                            <div class="d-flex">
                                <div class='me-3  text-center'style='background-color:#BCD1E1; height:fit-content; '> <img
                                src="${product.image}"
                                
                                alt="${product.title}"
                                width="50px"
                                height="50px"
                            /> </div>
                               <div class=''><span class="fs-6 fw-bold text-decoration-justify overflow-hidden">${product.title}</span></br> 
                               <p class='text-secondary w-100' style='height:46px;overflow:hidden;'>${product.description}</p>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-secondary">${product.category}</span>
                            </td>
                            <td >
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item border-0">
                                    <i class="bi bi-circle-fill color-option-5 "></i>
                                    <i class="bi bi-circle-fill color-option-1 "></i>
                                    <i class="bi bi-circle-fill color-option-3 "></i>
                                    <i class="bi bi-circle-fill color-option-4 "></i>
                                    
                                        
                                    </li>
                                </ul>
                            </td>
                            <td class='text-secondary fs-6 fw-bold' >₹${product.price}</td>
                            <td class='text-secondary fs-6 fw-bold'   >25</td>
                            <td class='text-secondary fs-6 fw-bold' >UK5894</td>
                            <td class='text-secondary'  >
                                <span class='text-warning '>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star icon-color"></i>
                                </span>
                                ${product.rating.rate} (${product.rating.count})
                            </td>
                            <td>
                                <button class="btn  icon-bg-color fw-bold text-dark d-none d-lg-inline" data-bs-toggle='modal'
                                data-bs-target='#productUpdate'   onclick='updateProduct(${product.id})'  value='${product.id}'>Edit</button>
                                <button class="btn  icon-bg-color fw-bold text-dark"  data-bs-toggle='dropdown' onclick='viewProduct(${product.id})'>
                                    <i class="bi bi-three-dots"></i>
                                </button>
                                <ul
                                class="dropdown-menu  shadow border-white bg-white "
                              >
                                <li
                                  class="dropdown-header d-lg-none d-block text-dark icon-bg-color rounded-3"
                                >
                                <button class='btn btn-secondary' data-bs-toggle='modal'
                                data-bs-target='#productUpdate' onclick='updateProduct(${product.id})'  value='${product.id}'>Edit</button>
                                </li>
                                <li
                                class="dropdown-header text-dark icon-bg-color rounded-3 "
                              >
                                
                                <button class='btn btn-primary'  data-bs-toggle='modal'
                                data-bs-target='#viewProduct'>View<i class="bi bi-eye"></i></button>
                              </li>
                                <li
                                  class="dropdown-header text-dark icon-bg-color rounded-3 "
                                >
                                  
                                  <button class='btn btn-danger'  data-bs-toggle='modal'
                                  data-bs-target='#deleteProduct' onclick='deleteProduct(${product.id})' value='${product.id}' >Delete <i class="bi bi-trash"></i></button>
                                </li>


                              
                              </ul>
                            </td>
                      
          `;
          productsDetails.querySelector('tbody').appendChild(productCard);
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    renderProduct();
   
  }

  //UPDATE PRODUCT
  function updateProduct(product){

  async function updateProductForm(event) {
    event.preventDefault();
    const productsDetails = document.getElementById('productsDetails');
    const product_id = product; 
    productsDetails.querySelector(`#up${product_id}`).innerHTML='';
    console.log(product_id);
    const updateProduct = {
      title: document.getElementById('updateProductTitle').value,
      price: document.getElementById('updateProductPrice').value,
      description: document.getElementById('updateProductDescription').value,
      image: document.getElementById('updateProductImage').value,
      category: document.getElementById('updateProductCategory').value,
      rate: document.getElementById('updateProductRating').value
    };
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateProduct)
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        productsDetails.querySelector(`#up${product_id}`).innerHTML = `
             <!-- Your HTML content for the new product -->
             <td class=''style='width: 30px'> 
                                   <label class="control control--checkbox">
                                   <input type="checkbox" value='${updatedProduct.id}' />
                                   <div class="control__indicator"></div>
                                 </label>
                               </th></td>
                                     <td class="col-3">
                                     <div class="d-flex" '>
                                         <div class='me-3  text-center'style='background-color:#BCD1E1; height:fit-content; '> <img
                                         src="${updatedProduct.image}"
                                         
                                         alt="${updatedProduct.title}"
                                         width="50px"
                                         height="50px"
                                     /> </div>
                                        <div class=''><span class="fs-6 fw-bold text-decoration-justify overflow-hidden">${updatedProduct.title}</span></br> 
                                        <p class='text-secondary w-100' style='height:46px;overflow:hidden;'>${updatedProduct.description}</p>
                                         </div>
                                     </td>
                                     <td>
                                         <span class="badge bg-secondary">${updatedProduct.category}</span>
                                     </td>
                                     <td>
                                         <ul class="list-group list-group-horizontal ">
                                             <li class="list-group-item border-0">
                                             <i class="bi bi-circle-fill color-option-5 "></i>
                                             <i class="bi bi-circle-fill color-option-1 "></i>
                                             <i class="bi bi-circle-fill color-option-3 "></i>
                                             <i class="bi bi-circle-fill color-option-4 "></i>
                                             </li>
                                         </ul>
                                     </td>
                                     <td class='text-secondary fs-6 fw-bold'>₹${updatedProduct.price}</td>
                                     <td class='text-secondary fs-6 fw-bold'>25</td>
                                     <td class='text-secondary fs-6 fw-bold'>UK5894</td>
                                     <td class='text-secondary'>
                                         <span class='text-warning '>
                                             <i class="bi bi-star-fill"></i>
                                             <i class="bi bi-star-fill"></i>
                                             <i class="bi bi-star-fill"></i>
                                             <i class="bi bi-star-fill"></i>
                                             <i class="bi bi-star icon-color"></i>
                                         </span>
                                        4.5 (155)
                                     </td>
                                     <td>
                                         <button class='btn  icon-bg-color fw-bold text-dark d-none d-lg-inline'  data-bs-toggle='modal'
                                         data-bs-target='#productUpdate' id='edit-product' onclick='updateProduct(${updatedProduct.id})' value='${updatedProduct.id}'>Edit</button>
                                         <button class="btn  icon-bg-color fw-bold text-dark" data-bs-toggle='dropdown'  onclick='viewProduct(${updatedProduct.id})'>
                                             <i class="bi bi-three-dots"></i>
                                         </button>
                                         <ul
                                         class="dropdown-menu  shadow border-white bg-white "
                                       >
                                         <li
                                           class='dropdown-header d-lg-none d-block text-dark icon-bg-color rounded-3'
                                         >
                                         <button class='btn btn-secondary' data-bs-toggle='modal'
                                         data-bs-target='#productUpdate'  id='edit-product' onclick='updateProduct(${updatedProduct.id})'  value='${updatedProduct.id}'>Edit</button>
                                         </li>
                                         <li class="dropdown-header text-dark icon-bg-color rounded-3">
                                          <button class='btn btn-primary'  data-bs-toggle='modal'
                                           data-bs-target='#viewProduct'>View<i class="bi bi-eye"></i></button>
                                        </li>
                                         <li
                                           class="dropdown-header text-dark icon-bg-color rounded-3 "
                                         >
                                         <button class='btn btn-danger'  data-bs-toggle='modal'
                                         data-bs-target='#deleteProduct' id='delete-product' onclick='deleteProduct(${updatedProduct.id})' value='${updatedProduct.id}' >Delete <i class="bi bi-trash"></i></button>
                                           </li>
                                       
                                       </ul>
                                     </td>
         `;
          console.log(product_id);
      } else {
        alert('Failed to update the product');
      }
    } catch (error) {
      console.error('Error updating the product:', error);
    }
    
  }
  console.log("Updated",+product);
  document.getElementById('updateProductForm').addEventListener('submit',updateProductForm);

}

 
  // DELETE PRODUCT
  function deleteProduct(deletee){
  async function deleteProductForm(event) {
    event.preventDefault();
    const productsDetails = document.getElementById('productsDetails');
    const product_id = deletee;
    //const product_id = document.getElementById('delete-product').value; // Replace '...' with the ID of the product you want to update
    console.log(product_id)
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const deleteProduct = await response.json();
        console.log('Product deleted:', deleteProduct);
        productsDetails.querySelector(`#up${product_id}`).innerHTML = `
        <!-- Your HTML content for the new product -->
        
    `;

    } else {
        alert('Failed to update the product');
      }
    } catch (error) {
      console.error('Error updating the product:', error);
    }
  }
  console.log("Delete",+ deletee);
  document.getElementById('deleteProductForm').addEventListener('submit', deleteProductForm);
}

//VIEW PRODUCT

async  function viewProduct(product){
  const productsView=document.getElementById("productsView");
  const product_id=product;
  console.log(product_id)
   
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${product_id}`);

    if (response.ok) {
      const productView = await response.json();
      console.log('Product updated:', productView);
      productsView.innerHTML=`
      <div
      class="modal fade"
      id="viewProduct"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 fw-bold badge bg-primary"
              id="staticBackdropLabel"
            >
              Product detail's
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
          <div class="card" style="border-radius: 15px;">
          <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src="${productView.image}"
              style="border-top-left-radius: 15px; border-top-right-radius: 15px; width:300px" class="img-fluid"
              alt="" />
           
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <div>
                <p><a href="#!" class="text-dark fw-bold text-decoration-none">${productView.title}</a></p>
                <p class="small text-muted">${productView.category}</p>
              </div>
              <div>
                <div class="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p class="small text-muted fw-bold"> ${productView.rating.rate} </p>
              </div>
            </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <p><a href="#!" class="text-dark fw-bold text-decoration-none">₹${productView.price}</a></p>
              <p class="text-dark">${productView.rating.count} <i class='bi bi-people-fill' fs-4></i></p>
            </div>
            <p class="small text-muted">Platinum</p>
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" class="text-dark fw-bold text-decoration-none">Cancel</a>
              <button type="button" class="btn btn-primary fw-bold">Buy now</button>
            </div>
          </div>
        </div>
      </div>
          </div>
          </div>
        </div>
      </div>`;
    } else {
      alert('Failed to update the product');
    }
  } catch (error) {
    console.error('Error updating the product:', error);
  }
}

  
  

  document.addEventListener('DOMContentLoaded', () => {
    productRender();
  });




  
  

  