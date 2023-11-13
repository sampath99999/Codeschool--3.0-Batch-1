function display() {
  fetch("https://fakestoreapi.com/products") // Example API endpoint
    .then((response) => response.json())
    .then((data) => {
      const productsList = document.getElementById("list");

      // Iterate through the data and create list items
      data.forEach((item) => {
        productsList.innerHTML = `
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
        for (let every of data) {
          productsList.innerHTML += `
                    <tr class="bg-light">
                        <td>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheckbox">
                                <label class="custom-control-label" for="customCheckbox"></label>
                            </div>                      
                        </td>
                        <td>
                            <img src='${every.image}' alt='Product Image' class='mt-4' width='100px' height='100px' />
                        </td>
                        <td>
                            <p class='fw-bold'>'${every.title}'</p> 
                            <span class= 'solid'>${every.description}</span> 
                        </td>
                        <td>
                            <span class= 'bg-secondary text-light ms-lg-2 p-lg-2 d-block h-25' id='category'>'${every.category}'</span>
                        </td>
                        <td> 
                            <p class="choices"></p>
                            <p class="choices"></p>
                            <p class="choices"></p>
                        </td>
                        <td> 
                            <p>'${every.price}'</p>
                        </td>
                        <td> 
                            <p class="ps-lg-4">25</p>
                        </td>
                        <td> 
                            <p>UK5894</p>
                        </td>
                        <td>
                            <p>'${every.rating.rate}'('${every.rating.count}')</p>
                        </td>
                        <td> 
                            <button>Edit</button> 
                            <button>
                            <i class="fa-solid fa-ellipsis"></i>
                            </button>
                        </td>
                    </tr>
                    `;
        }
      });
    });
}
display();
