
document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('tableBody');


    fetch('http://localhost/Codeschool/Task4/api/getAllProducts.php')
        .then(res => res.json())
        .then(data => {
            const products = data;
            // console.log(products);
            

           products.forEach(product => {
               const imgSrc = product.image;
               const name = product.name;
               const category = product.category_name;
               const price = product.price;
              
               const newRow = document.createElement('tr');
               newRow.className = 'table-rows';
               newRow.innerHTML = `
               <td><input type="checkbox"/>&nbsp;</td>
                       <td>
                           <div class="table-data d-flex align-items-center">
                               <img src="${imgSrc}" class="profile-pic"/>
                                   <div class="w-50">
                                       <p>${name}</p>
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
                      
                       <td>UY3749</td>
                      
                       
               `;
               tableBody.appendChild(newRow); 
           });
        });
    
        
    
    
    
});

    function saveProduct() {
        let name = $("#productName").val();
        let price = $("#productPrice").val();
        let image = $("#productImage").val();
        let category = $("#productCategory").val();
        let description = $("#productDescription").val();
       
        console.log(name);
        console.log(price);
        console.log(image);
        console.log(category);
        console.log(description);

        $.ajax({
            url: "http://localhost/Codeschool/Task4/api/addProducts.php",
            method: "POST",
            data: {
                name,
                price,
                image,
                description,
                category
            },
            success: function (response) {
                response = JSON.parse(response);
                Swal.fire({
                    title: 'Success!',
                    text: 'Product added successfully! Please refresh to see',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
               
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

