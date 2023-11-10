let ele = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
  ele.classList.toggle("toggled");
};

fetch("https://fakestoreapi.com/products?limit=10")
  .then((data) => {
    return data.json();
  })

  .then((objectData) => {
    console.log(objectData);
    let tableData = " ";
    objectData.map((value) => {
      tableData += ` <tr>
      <td scope="col"><i class="bi bi-app"></i></td>
      <td><img src="${value.image}" height="100px" width="100px"/></td>
      <td>${value.category}</td>
      <td>
      <i class="bi bi-circle-fill" style="color: brown"></i>
      <i class="bi bi-circle-fill" style="color: olive"></i>
      <i class="bi bi-circle-fill" style="color: purple"></i>
      <i class="bi bi-circle-fill" style="color: goldenrod"></i>
    </td>
      <td>${value.price}</td>
      <td>50</td>
      <td>⭐⭐⭐⭐</td>
      <td class="align-items-center pt-4">
         <a href="#" class="btn btn-secondary">Edit</a>
         <a href="#" class="btn">
           <i class="bi bi-three-dots"></i>
         </a>
      </td>
       </tr>`;
    });
    document.getElementById("table_body").innerHTML = tableData;
  });