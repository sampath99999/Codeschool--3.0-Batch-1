fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((json) => {
    DisplayData(json);
    console.log(json);
  });

$.ajax({
  url: "https://fakestoreapi.com/products",
  success: function (data) {
    DisplayData(data);
    console.log(data);
  },
});

const display = document.getElementById("productsDetails");

function DisplayData(products) {
  let tableHTML = "";

  products.forEach((element) => {
    tableHTML += `
      <tr class="bg-white">
                           <th class="py-3" scope="row">
                             <form class="mt-2" action="">
                               <input type="checkbox" name="" id="${
                                 element.id
                               }" />
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
                               ${element.title.split(" ").slice(0, 3).join(" ")}
                               </p>
                               <p
                                 class="text-secondary fw-semibold m-0 d-inline-block"
                               >
                               ${element.description
                                 .split(" ")
                                 .slice(0, 7)
                                 .join(" ")}
                               </p>
                             </div>
                           </td>
                           <td class="py-3">
                             <span class="badge bg-warning">${
                               element.category
                             }</span>
                           </td>
                           <td class="py-3 text-center">
                           <div class="mt-2">
                           <i class="bi bi-circle-fill text-danger"></i>
                           <i class="bi bi-circle-fill text-secondary"></i>
                           <i class="bi bi-circle-fill text-success"></i>
                           <i class="bi bi-circle-fill text-dark"></i>
                         </div>
                           </td>
                           <td class="py-3 text-center"><p class="mt-2 fw-bold"> €X${
                             element.price
                           }</p></td>
                           <td class="py-3 text-center"><p class="mt-2">786</p></td>
                           <td class="py-3 text-center"><p class="mt-2">SCVB7531</p></td>
                           <td class="py-3 text-center">
                             <p class="mt-2">
                              <i class="bi bi-star-fill text-success"></i>
                               <i class="bi bi-star-fill text-success"></i>
                               <i class="bi bi-star-fill text-success"></i>
                               <i class="bi bi-star-fill text-success"></i>
                               <i class="bi bi-star-fill"></i> ${
                                 element.rating.rate
                               }  &nbsp; ${element.rating.count}
                             </p>
                           </td>
                           <td class="py-3 text-center">
                             <div class="d-flex">
                             <button type="button" class="btn btn-secondary" ">
                             Edit
                           </button>
                               <button class="btn btn-secondary m-1">
                                 <i class="bi bi-three-dots"></i>
                               </button>
                             </div>
                           </td>
                         </tr>
    `;
  });

  display.querySelector("tbody").innerHTML = tableHTML;
}
