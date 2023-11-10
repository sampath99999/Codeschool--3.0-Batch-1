document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('tableBody');


    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            const products = data;
            console.log(products);
            

           products.forEach(product => {
               const imgSrc = product.image;
               const title = product.title;
               const category = product.category;
               const price = product.price;
               const stock = product.rating.count;
               const rate = product.rating.rate;
               const newRow = document.createElement('tr');
               newRow.className = 'table-rows';
               newRow.innerHTML = `
               <td><input type="checkbox"/>&nbsp;</td>
                       <td>
                           <div class="table-data d-flex align-items-center">
                               <img src="${imgSrc}" class="profile-pic"/>
                                   <div class="w-50">
                                       <p>${title}</p>
                                       <label for="profile-name">Click for more</label>
                                   </div>
                           </div>
                       </td>
                       <td>
                           <button class="btn category-button">${category}</button>
                       </td>
                       <td>
                           <div class="d-flex ">
                               <div class="circle bg-primary"></div>
                               <div class="circle bg-secondary"></div>
                               <div class="circle bg-danger"></div>
                           </div>
                       </td>
                       <td>$${price}</td>
                       <td>${stock}</td>
                       <td>UY3749</td>
                       <td>${rate}</td>
                       <td>
                           <button class="btn category-button">Edit</button>
                       </td>
               `;
               tableBody.appendChild(newRow);
           });
        });
    
    
    
});