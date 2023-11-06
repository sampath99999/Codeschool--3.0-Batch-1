
// Function to fetch and display data
function fetchData() {
    fetch('https://fakestoreapi.com/products') 
        .then(response => response.json())
        .then(data => {
            const productDetails = document.getElementById('product');

            // Iterate through the data and create list items
            data.forEach(item => {
                productDetails.innerHTML=`
                <tr class='text-secondary'>
                    <th>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheckbox">
                            <label class="custom-control-label" for="customCheckbox"></label>
                        </div>
                    </th>
                    <th  class="pe-lg-5 w-50 ms-lg-3" colspan = "2">PRODUCT DETAILS</th>
                    <th class="px-lg-5 ms-lg-3" id="category">CATEGORY</th>
                    <th class="px-lg-5">OPTION COLORS</th>
                    <th class="px-lg-5">PRICE</th>
                    <th class="px-lg-5">STOCK</th>
                    <th class="px-lg-5">SKU</th>
                    <th class="px-lg-5">RATE</th>
                    <th class="px-lg-5">ACTIONS</th>
                </tr>`;
                for (let each of data){
                    productDetails.innerHTML += `
                    <tr class="bg-white">
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheckbox">
                                <label class="custom-control-label" for="customCheckbox"></label>
                            </div>                      
                        </td>
                        <td>
                            <img src='${each.image}' alt='Product Image' class='mt-4' width='100px' height='100px' />
                        </td>
                        <td>
                            <p class='fw-bold fs-5'>'${each.title}'</p> 
                            <span class= 'solid'>${each.description}</span> 
                        </td>
                        <td>
                            <span class= 'bg-secondary text-light ms-lg-2 p-lg-2 d-block h-25' id='category'>'${each.category}'</span>
                        </td>
                        <td> 
                            <div class="option1 ms-3"></div>
                            <div class="option2"></div>
                            <div class="option3"></div>
                        </td>
                        <td> 
                            <p><b>'${each.price}'</b></p>
                        </td>
                        <td> 
                            <p class="ps-lg-4"><b>25</b></p>
                        </td>
                        <td> 
                            <p><b>UK5894</b></p>
                        </td>
                        <td>
                            <p><b>'${each.rating.rate}'('${each.rating.count}')</b></p>
                        </td>
                        <td> 
                            <button><b>Edit</b></button> 
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    `;
                }
            });
        })
}
fetchData();
